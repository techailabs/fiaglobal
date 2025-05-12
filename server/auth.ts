import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Express, Request } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { storage } from './storage';
import { User } from '@shared/schema';
import { env } from './env';
import postgres from 'postgres';

declare global {
  namespace Express {
    // Use User type from schema but avoid recursion
    interface User {
      id: string;
      full_name: string;
      email: string;
      password: string;
      role: string;
      status: string;
      phone: string;
      created_at: Date;
    }
  }
}

const scryptAsync = promisify(scrypt);

// Password hashing functions
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split('.');
  const hashedBuf = Buffer.from(hashed, 'hex');
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Setup authentication
export function setupAuth(app: Express) {
  // Create session store
  const PgSessionStore = connectPgSimple(session);
  
  // Session configuration
  const sessionConfig: session.SessionOptions = {
    store: new PgSessionStore({
      conObject: { connectionString: env.DATABASE_URL },
      tableName: 'session',
      createTableIfMissing: true
    }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    }
  };

  // Set up session middleware
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
          }

          const isValid = await comparePasswords(password, user.password);
          
          if (!isValid) {
            return done(null, false, { message: 'Incorrect email or password' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Authentication routes
  app.post('/auth/register', async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(req.body.email);
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash password
      const hashedPassword = await hashPassword(req.body.password);

      // Create user
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
        status: 'Active', // Using proper enum value from schema
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Log in the user
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging in after registration' });
        }
        
        return res.status(201).json(userWithoutPassword);
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err: Error | null, user: Express.User | false, info: { message?: string } | undefined) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: info?.message || 'Authentication failed' });
      }
      
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/user', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as User;
    
    res.json(userWithoutPassword);
  });
}
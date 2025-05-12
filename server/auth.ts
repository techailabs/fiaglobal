import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { storage } from './storage';
import { User } from '@shared/schema';
import { env } from './env';
import postgres from 'postgres';
import jwt from "jsonwebtoken";

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

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function setupAuth(app: Express) {
  app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await storage.getUserById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });

  // Authentication routes
  app.post('/api/register', async (req, res) => {
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

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(201).json({ ...userWithoutPassword, token });


    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  app.post('/api/login', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
      const user = await storage.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const isValid = await comparePasswords(req.body.password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ ...userWithoutPassword, token });

    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/logout', (req, res) => {
    // No need to do anything, as JWT is stateless
    res.status(200).json({ message: 'Logged out successfully' });
  });

  app.get('/api/user', (req, res) => {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = (req as any).user as User;
    
    res.json(userWithoutPassword);
  });
}
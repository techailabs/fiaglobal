
import { Request, Response, NextFunction } from 'express';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { Database } from "@replit/database";

const db = new Database();
const scryptAsync = promisify(scrypt);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Add some dummy users
async function seedUsers() {
  const users = await db.get('users');
  if (!users) {
    const dummyUsers = {
      'admin@test.com': {
        id: '1',
        email: 'admin@test.com',
        password: await hashPassword('admin123'),
        full_name: 'Admin User',
        role: 'admin',
        status: 'Active'
      },
      'csp@test.com': {
        id: '2',
        email: 'csp@test.com',
        password: await hashPassword('csp123'),
        full_name: 'CSP Agent',
        role: 'csp_agent',
        status: 'Active'
      },
      'auditor@test.com': {
        id: '3',
        email: 'auditor@test.com',
        password: await hashPassword('auditor123'),
        full_name: 'Auditor User',
        role: 'auditor',
        status: 'Active'
      }
    };
    await db.set('users', dummyUsers);
  }
}

// Call seed function
seedUsers();

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

export function setupAuth(app: Express) {
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await db.get('users') || {};
      const user = users[email];

      if (!user || !(await comparePasswords(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      const { password: _, ...userWithoutPassword } = user;
      res.json({ ...userWithoutPassword, token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Error logging in' });
    }
  });

  app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const users = await db.get('users') || {};
      const user = Object.values(users).find((u: any) => u.id === decoded.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });
}

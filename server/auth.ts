import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  return bcrypt.compare(supplied, stored);
}

export function setupAuth(app: any) {
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Login attempt for:', email);

      const result = await db.select().from(users).where(eq(users.email, email));
      const user = result[0];

      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) {
        console.log('Invalid password for:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      const { password: _, ...userWithoutPassword } = user;

      console.log('Login successful for:', email);
      res.json({ 
        user: userWithoutPassword,
        token,
        message: 'Login successful'
      });
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
      const result = await db.select().from(users).where(eq(users.id, decoded.userId));
      const user = result[0];

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
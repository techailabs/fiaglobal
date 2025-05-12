import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

// Load environment variables from .env file
dotenv.config();

// Generate a random session secret if not provided
const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString('hex');

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: sessionSecret,
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
};
import 'dotenv/config';

// Runtime environment variables
export const env = {
  // Database connection
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // Auth settings
  SESSION_SECRET: process.env.SESSION_SECRET || 'fia-global-secret-key',
  
  // Server settings
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(v => !env[v as keyof typeof env]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}
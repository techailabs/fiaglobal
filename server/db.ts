
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import { env } from './env';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client with connection retry logic
const client = postgres(env.DATABASE_URL, {
  max: 1,
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

// Create drizzle client with schema
export const db = drizzle(client, { schema });

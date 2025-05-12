import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';
import { env } from './env';

// Create postgres client
const client = postgres(env.DATABASE_URL);

// Create drizzle client with schema
export const db = drizzle(client, { schema });
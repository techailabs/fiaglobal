import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';
import { env } from './env';

// Database client
const client = postgres(env.DATABASE_URL);

// Create the Drizzle ORM instance
export const db = drizzle(client, { schema });

// Export for use in storage and other files
export { schema };
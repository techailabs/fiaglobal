import { db } from '../server/db';
import { 
  users, transactions, audits, complaints, 
  alerts, face_checks, relief_claims 
} from '../shared/schema';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../server/env';
import bcrypt from 'bcrypt';

async function main() {
  console.log('Starting database setup...');

  try {
    // Connect to the database with direct connection to be able to create tables
    const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
    const migrationDb = drizzle(migrationClient);

    console.log('Creating tables...');
    
    // Create all tables if they don't exist
    await migrationDb.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        txn_type TEXT NOT NULL,
        amount NUMERIC(15, 2) NOT NULL,
        status TEXT NOT NULL,
        description TEXT,
        reference_id TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        gps_lat DOUBLE PRECISION,
        gps_long DOUBLE PRECISION,
        csp_agent_id TEXT
      );

      CREATE TABLE IF NOT EXISTS audits (
        id TEXT PRIMARY KEY,
        auditor_id TEXT,
        csp_id TEXT,
        status TEXT NOT NULL,
        findings JSONB,
        photos TEXT[],
        gps_lat DOUBLE PRECISION,
        gps_long DOUBLE PRECISION,
        hash TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        scheduled_date TIMESTAMP WITH TIME ZONE
      );

      CREATE TABLE IF NOT EXISTS complaints (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        resolved_at TIMESTAMP WITH TIME ZONE,
        resolution TEXT,
        csp_agent_id TEXT,
        priority TEXT
      );

      CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        type TEXT,
        link TEXT
      );

      CREATE TABLE IF NOT EXISTS face_checks (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        check_result BOOLEAN NOT NULL,
        confidence_score NUMERIC(5, 2),
        check_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        device_id TEXT,
        transaction_id TEXT,
        photo_url TEXT
      );

      CREATE TABLE IF NOT EXISTS relief_claims (
        id TEXT PRIMARY KEY,
        csp_agent_id TEXT,
        claim_amount NUMERIC(15, 2) NOT NULL,
        reason TEXT NOT NULL,
        status TEXT NOT NULL,
        filed_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        resolved_date TIMESTAMP WITH TIME ZONE,
        approver_id TEXT,
        approval_notes TEXT,
        supporting_docs TEXT[]
      );
    `);
    
    console.log('Tables created successfully!');

    // Insert initial admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    console.log('Inserting demo users...');
    
    // Check if admin user already exists
    const existingAdmin = await migrationDb.select().from(users).where(sql`email = 'admin@fia.com'`);
    
    if (existingAdmin.length === 0) {
      await migrationDb.insert(users).values({
        id: crypto.randomUUID(),
        full_name: 'Admin User',
        email: 'admin@fia.com',
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        phone: '9876543210'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Create demo users for all roles
    const roles = ['csp_agent', 'auditor', 'bank_officer', 'customer'];
    
    for (const role of roles) {
      const email = `${role}@fia.com`;
      const existing = await migrationDb.select().from(users).where(sql`email = ${email}`);
      
      if (existing.length === 0) {
        await migrationDb.insert(users).values({
          id: crypto.randomUUID(),
          full_name: `${role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')} User`,
          email,
          password: hashedPassword,
          role,
          status: 'active',
          phone: `987654321${roles.indexOf(role) + 1}`
        });
        console.log(`${role} user created`);
      } else {
        console.log(`${role} user already exists`);
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

main();
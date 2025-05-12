
import { db } from '../server/db';
import { users } from '../shared/schema';
import { hashPassword } from '../server/auth';

async function seed() {
  try {
    const hashedPassword = await hashPassword('password123');
    
    await db.insert(users).values([
      {
        id: crypto.randomUUID(),
        email: 'admin@fia.com',
        password: hashedPassword,
        full_name: 'Admin User',
        role: 'admin',
        phone: '1234567890',
        status: 'Active'
      },
      {
        id: crypto.randomUUID(),
        email: 'csp1@fia.com',
        password: hashedPassword,
        full_name: 'CSP Agent 1',
        role: 'csp_agent',
        phone: '1234567891',
        status: 'Active'
      },
      {
        id: crypto.randomUUID(),
        email: 'auditor@fia.com',
        password: hashedPassword,
        full_name: 'Auditor User',
        role: 'auditor',
        phone: '1234567892',
        status: 'Active'
      },
      {
        id: crypto.randomUUID(),
        email: 'officer@fia.com',
        password: hashedPassword,
        full_name: 'Bank Officer',
        role: 'bank_officer',
        phone: '1234567893',
        status: 'Active'
      }
    ]);

    console.log('Sample users created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seed();

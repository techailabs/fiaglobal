
import { db } from '../server/db';
import { users } from '../shared/schema';
import { hashPassword } from '../server/auth';

async function seed() {
  try {
    const hashedPassword = await hashPassword('password123');
    
    await db.insert(users).values([
      {
        email: 'admin@test.com',
        password: hashedPassword,
        full_name: 'Admin User',
        role: 'admin',
        phone: '1234567890',
        status: 'Active'
      },
      {
        email: 'csp@test.com',
        password: hashedPassword,
        full_name: 'CSP Agent',
        role: 'csp_agent',
        phone: '1234567891',
        status: 'Active'
      },
      {
        email: 'customer@test.com',
        password: hashedPassword,
        full_name: 'Customer User',
        role: 'customer',
        phone: '1234567892',
        status: 'Active'
      }
    ]);

    console.log('Sample users created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();

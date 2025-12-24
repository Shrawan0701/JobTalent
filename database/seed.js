import pool from '../src/config/database.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('Seeding database...');
    
    const users = [
      {
        email: 'talent@example.com',
        password: 'password123',
        role: 'talent',
        firstName: 'John',
        lastName: 'Talent'
      },
      {
        email: 'employer@example.com',
        password: 'password123',
        role: 'employer',
        firstName: 'Jane',
        lastName: 'Employer'
      }
    ];
    
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      try {
        await client.query(
          'INSERT INTO users (email, password_hash, role, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
          [user.email, hashedPassword, user.role, user.firstName, user.lastName]
        );
        console.log(`Created user: ${user.email}`);
      } catch (err) {
        console.log(`User ${user.email} already exists`);
      }
    }
    
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

seedDatabase();

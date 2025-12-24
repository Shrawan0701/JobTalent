import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationSQL = fs.readFileSync(
  path.join(__dirname, './migrations/001_initial_schema.sql'),
  'utf8'
);

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');
    
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      try {
        await client.query(statement);
      } catch (err) {
        if (!err.message.includes('already exists')) {
          console.error('Error:', err.message);
        }
      }
    }
    
    console.log('Migrations completed');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

runMigrations();

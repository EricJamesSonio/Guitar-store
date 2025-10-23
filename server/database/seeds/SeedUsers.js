import { db } from '../db.js';

export async function seedUsers() {
  await db.query(`
    INSERT INTO users (name, email, password)
    VALUES
    ('John Doe', 'john@example.com', 'hashedpassword1'),
    ('Jane Smith', 'jane@example.com', 'hashedpassword2')
  `);
  console.log('✅ Users seeded');
}

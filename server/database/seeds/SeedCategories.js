import { db } from '../db.js';

export async function seedCategories() {
  await db.query(`
    INSERT INTO categories (name)
    VALUES ('Electric Guitars'), ('Acoustic Guitars'), ('Bass Guitars')
  `);
  console.log('✅ Categories seeded');
}

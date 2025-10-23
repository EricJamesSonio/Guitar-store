import { db } from '../db.js';

export async function seedProducts() {
  await db.query(`
    INSERT INTO products (name, description, price, image, category_id)
    VALUES
    ('Fender Stratocaster', 'Classic electric guitar', 899.99, 'fender.jpg', 1),
    ('Gibson Les Paul', 'Iconic rock guitar', 1199.99, 'lespaul.jpg', 1),
    ('PRS Custom 24', 'Premium electric guitar', 1499.99, 'prs.jpg', 1),
    ('Taylor 214ce', 'Smooth acoustic guitar', 799.99, 'taylor.jpg', 2)
  `);
  console.log('✅ Products seeded');
}

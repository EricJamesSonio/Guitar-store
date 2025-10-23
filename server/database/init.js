import { db } from './db.js';
import { UserModel } from './models/UserModel.js';
import { CategoryModel } from './models/CategoryModel.js';
import { ProductModel } from './models/ProductModel.js';
import { CartItemModel } from './models/CartItemModel.js';
import { OrderModel } from './models/OrderModel.js';
import { OrderItemModel } from './models/OrderItemModel.js';
import { runSeeds } from './seeds/SeedAll.js';

async function init() {
  try {
    console.log('🧱 Initializing database...');

    // Disable FK checks to drop all tables safely
    await db.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await db.query(`
      DROP TABLE IF EXISTS 
        order_items, 
        orders, 
        cart_items, 
        products, 
        categories, 
        users
    `);
    await db.query(`SET FOREIGN_KEY_CHECKS = 1`);

    // ✅ Create tables in correct dependency order
    await UserModel.createTable();
    await CategoryModel.createTable();
    await ProductModel.createTable();
    await CartItemModel.createTable();
    await OrderModel.createTable();
    await OrderItemModel.createTable();

    // ✅ Seed initial data
    await runSeeds();

    console.log('✅ Database initialized and seeded successfully!');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    // Always close DB pool properly
    await db.end();
    console.log('🔒 Database connection closed.');
    process.exit(0);
  }
}

init();

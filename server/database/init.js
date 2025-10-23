import { db } from './db.js';
import { UserModel } from './models/UserModel.js';
import { CategoryModel } from './models/CategoryModel.js';
import { ProductModel } from './models/ProductModel.js';
import { CartItemModel } from './models/CartItemModel.js';
import { OrderModel } from './models/OrderModel.js';
import { OrderItemModel } from './models/OrderItemModel.js';
import { runSeeds } from './seeds/SeedAll.js';

async function waitForDB(retries = 10, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await db.query('SELECT 1');  // simple query to test connection
      console.log('✅ Database is ready!');
      return;
    } catch (err) {
      console.log(`⏳ Waiting for DB to be ready (${i + 1}/${retries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Unable to connect to DB after multiple attempts');
}

async function init() {
  try {
    await waitForDB();

    console.log('🧱 Initializing database...');

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

    await UserModel.createTable();
    await CategoryModel.createTable();
    await ProductModel.createTable();
    await CartItemModel.createTable();
    await OrderModel.createTable();
    await OrderItemModel.createTable();

    await runSeeds();

    console.log('✅ Database initialized and seeded successfully!');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    await db.end();
    console.log('🔒 Database connection closed.');
    process.exit(0);
  }
}

init();

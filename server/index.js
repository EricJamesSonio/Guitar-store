import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './database/db.js'; // 👈 import your db connection
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('Server running...'));

// Port setup
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    // Test connection to the database
    const [rows] = await db.query('SELECT DATABASE() AS db_name;');

    console.log(`✅ Connected to database: ${rows[0].db_name}`);
    console.log(`🌐 Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`🗂️  Env file used: ${process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env'}`);
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err.message);
  }
});

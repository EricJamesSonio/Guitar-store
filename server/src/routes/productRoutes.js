import express from 'express';
import { ProductModel } from '../../database/models/ProductModel.js';
import { db } from '../../database/db.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!products.length) return res.status(404).json({ message: 'Product not found' });
    res.json(products[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

export default router;

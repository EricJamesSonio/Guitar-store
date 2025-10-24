import express from 'express';
import { db } from '../../database/db.js';

const router = express.Router();

// ✅ GET all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// ✅ GET product by ID
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

// ✅ POST create new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category_id } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, image, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image, category_id || null]
    );
    res.status(201).json({ id: result.insertId, name, description, price, image, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating product' });
  }
});

// ✅ PUT update product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, image, category_id } = req.body;
    await db.query(
      'UPDATE products SET name=?, description=?, price=?, image=?, category_id=? WHERE id=?',
      [name, description, price, image, category_id || null, req.params.id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating product' });
  }
});

// ✅ DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting product' });
  }
});

export default router;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('Server running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import { Router } from 'express';
import { db, type Product } from '../db';

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';
  const products = db
    .prepare('SELECT * FROM products WHERE name LIKE ? ORDER BY name')
    .all(`%${q}%`) as Product[];

  res.json(products);
});

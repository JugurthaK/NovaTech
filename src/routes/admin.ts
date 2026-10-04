import { Router } from 'express';
import _ from 'lodash';
import { db, type User } from '../db';
import { requireAdmin, requireAuth } from '../middleware/auth';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get('/users', (_req, res) => {
  const users = db.prepare('SELECT * FROM users ORDER BY id').all() as User[];
  res.json(users.map((user) => _.omit(user, 'password')));
});

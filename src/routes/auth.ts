import { Router } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { config } from '../config';
import { db, hashPassword, type User } from '../db';
import type { TokenPayload } from '../middleware/auth';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  let user: User | undefined;
  try {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${hashPassword(password)}'`;
    user = db.prepare(query).get() as User | undefined;
  } catch {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const payload: TokenPayload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

  res.json({ token, user: _.pick(user, ['id', 'email', 'role']) });
});

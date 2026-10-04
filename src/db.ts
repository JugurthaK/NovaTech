import Database from 'better-sqlite3';
import { createHash, randomBytes } from 'node:crypto';

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const db = new Database(':memory:');

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

db.exec(`
  CREATE TABLE users (
    id       INTEGER PRIMARY KEY,
    email    TEXT    NOT NULL UNIQUE,
    password TEXT    NOT NULL,
    role     TEXT    NOT NULL DEFAULT 'customer'
  );

  CREATE TABLE products (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    price       REAL NOT NULL
  );
`);

const insertUser = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)');
// The admin password is random: the only way in is through a vulnerability.
insertUser.run('admin@novatech.local', hashPassword(randomBytes(32).toString('hex')), 'admin');
insertUser.run('alice@novatech.local', hashPassword('alice123'), 'customer');
insertUser.run('bob@novatech.local', hashPassword('bob123'), 'customer');

const insertProduct = db.prepare('INSERT INTO products (name, description, price) VALUES (?, ?, ?)');
insertProduct.run('NovaPhone X', 'Smartphone 6.5" OLED', 799);
insertProduct.run('NovaBook Pro', 'Ultraportable 14" 32 Go', 1899);
insertProduct.run('NovaBuds', 'Écouteurs sans fil à réduction de bruit', 149);
insertProduct.run('NovaWatch', 'Montre connectée GPS', 299);

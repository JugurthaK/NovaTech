import express from 'express';
import { config } from './config';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { productsRouter } from './routes/products';

const app = express();

app.use(express.json());

app.use('/api', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

app.listen(config.port, config.host, () => {
  console.log(`NovaTech API listening on http://${config.host}:${config.port}`);
});

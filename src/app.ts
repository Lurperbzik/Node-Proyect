import express from 'express';
import pkg from '../package.json';
import productRoutes from './routes/products.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        name: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version
    });
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);

export default app;

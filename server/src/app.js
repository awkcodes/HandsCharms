import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import setRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';
import sellerRoutes from './routes/seller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
app.use(express.static(path.join(__dirname, '../public')));

// Database Connection and Sync
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        // Force sync during development
        return sequelize.sync({ 
           // force: true 
            });
        
    })
    .then(() => {
        console.log('Database synchronized and models updated');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

setRoutes(app);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
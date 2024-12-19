import express from 'express';
import sequelize from './config/database.js';
import setRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import './models/User.js';  // Import User model
import './models/Product.js';  // Import Product model
import './models/Order.js';  // Add this line after other model imports

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Serve static files from public directory
app.use('/uploads', express.static('public/uploads'));

// Database Connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

setRoutes(app);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
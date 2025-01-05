import User from './User.js';
import Product from './Product.js';
import Order from './Order.js';

// Setup associations
User.hasMany(Order, { as: 'orders', foreignKey: 'userId' });
Order.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Product.hasMany(Order, { as: 'orders', foreignKey: 'productId' });
Order.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

export { User, Product, Order };
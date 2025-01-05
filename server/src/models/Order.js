import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    payment: {
        type: DataTypes.ENUM('cash', 'credit_card', 'paypal'),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'order'
});

// Define associations
Order.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Order.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

export default Order;
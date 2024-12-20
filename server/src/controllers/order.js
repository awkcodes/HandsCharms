import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

class OrderController {
    async createOrder(req, res) {
        try {
            const { productId, amount, address, phoneNumber } = req.body;
            const product = await Product.findByPk(productId);
            
            if (!product || product.quantity < amount) {
                return res.status(400).json({ message: 'Product not available in requested quantity' });
            }

            const order = await Order.create({
                userId: req.user.id,
                productId,
                amount,
                address,
                phoneNumber
            });

            // Update product quantity
            await product.update({ quantity: product.quantity - amount });

            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrdersByUser(req, res) {
        try {
            const userId = req.user.id;
            
            if (!userId) {
                return res.status(400).json({ message: 'User ID not found' });
            }

            const orders = await Order.findAll({
                where: { userId },
                include: [
                    { 
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image'] 
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching orders', 
                error: error.message 
            });
        }
    }

    async getOrdersByProduct(req, res) {
        try {
            const { productId } = req.params;
            const orders = await Order.findAll({
                where: { productId },
                include: [
                    { model: User, as: 'user', attributes: ['id', 'email', 'address'] }
                ]
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.userId !== req.userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            await order.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order', error: error.message });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            await order.update({ status });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status', error: error.message });
        }
    }
}

export default OrderController;
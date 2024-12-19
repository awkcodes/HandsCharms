import express from 'express';
import OrderController from '../controllers/order.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const orderController = new OrderController();

router.use(authMiddleware); // Protect all order routes

router.post('/', orderController.createOrder);
router.get('/user', orderController.getOrdersByUser);
router.get('/product/:productId', orderController.getOrdersByProduct);
router.delete('/:id', orderController.deleteOrder);
router.patch('/:id/status', orderController.updateOrderStatus);

export default router;
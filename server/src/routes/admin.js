import express from 'express';
import AdminController from '../controllers/admin.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();
const adminController = new AdminController();

router.post('/login', adminController.login);

// Protected routes
router.use(adminAuth);
router.get('/users', adminController.getUsers);
router.get('/products', adminController.getProducts);
router.get('/orders', adminController.getOrders);

router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

router.put('/orders/:id', adminController.updateOrder);
router.delete('/orders/:id', adminController.deleteOrder);

router.delete('/users/:id', adminController.deleteUser);

export default router;
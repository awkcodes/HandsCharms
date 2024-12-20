import express from 'express';
import AdminController from '../controllers/admin.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();
const adminController = new AdminController();

// Public admin route
router.post('/login', adminController.login);

// Protected admin routes
router.use(adminAuth);
router.get('/products', adminController.getProducts);
router.get('/orders', adminController.getOrders);
router.get('/users', adminController.getUsers);

export default router;
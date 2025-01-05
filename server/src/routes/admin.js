import express from 'express';
import multer from 'multer';
import AdminController from '../controllers/admin.js';
import adminAuth from '../middleware/adminAuth.js';
import path from 'path';

const router = express.Router();
const adminController = new AdminController();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Public admin route
router.post('/login', adminController.login);

// Protected admin routes
router.use(adminAuth);
router.post('/products', adminAuth, upload.single('image'), adminController.createProduct);
router.get('/products', adminController.getProducts);
router.get('/orders', adminController.getOrders);
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);

export default router;
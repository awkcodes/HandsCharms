import express from 'express';
import AuthController from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
import express from 'express';
import ProductController from '../controllers/product.js';
import upload from '../middleware/upload.js';

const router = express.Router();
const productController = new ProductController();

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
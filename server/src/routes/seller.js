import express from 'express';
import multer from 'multer';
import path from 'path';
import SellerController from '../controllers/seller.js';
import sellerAuth from '../middleware/sellerAuth.js';

const router = express.Router();
const sellerController = new SellerController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.use(sellerAuth);
router.use(express.urlencoded({ extended: true }));

router.post('/products', upload.single('image'), (req, res, next) => {
  console.log('Request body:', req.body);
  console.log('File:', req.file);
  next();
}, sellerController.createProduct);
router.get('/products', sellerController.getProducts);
router.put('/products/:id', sellerController.updateProduct);
router.get('/orders', sellerController.getOrders);

export default router;
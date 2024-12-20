import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

class AdminController {
  async login(req, res) {
    const { email, password } = req.body;
    if (email === process.env.admin_email && password === process.env.admin_password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, category, price, quantity, description } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const product = await Product.create({
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description,
        image: imagePath
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      await product.update(req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          { 
            model: User, 
            as: 'user',
            attributes: ['id', 'name', 'email'] 
          },
          { 
            model: Product, 
            as: 'product',
            attributes: ['id', 'name', 'price'] 
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      await order.update(req.body);
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDashboardStats(req, res) {
    try {
      const userCount = await User.count();
      const productCount = await Product.count();
      const orderCount = await Order.count();
      const recentOrders = await Order.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [
          { model: User, attributes: ['email'] },
          { model: Product, attributes: ['name'] }
        ]
      });

      res.json({
        userCount,
        productCount,
        orderCount,
        recentOrders
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AdminController;
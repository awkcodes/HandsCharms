import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

class SellerController {
    async createProduct(req, res) {
        try {
            // Parse form data
            const productData = {
                name: req.body.name,
                category: req.body.category,
                price: parseFloat(req.body.price),
                quantity: parseInt(req.body.quantity),
                description: req.body.description,
                sellerId: req.seller.id,
                image: req.file ? `/uploads/${req.file.filename}` : null
            };

            console.log('Creating product with data:', productData);

            const product = await Product.create(productData);
            res.status(201).json(product);
        } catch (error) {
            console.error('Product creation error:', error);
            res.status(400).json({ 
                message: error.message,
                details: error.errors?.map(e => e.message)
            });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await Product.findAll({
                where: { sellerId: req.seller.id }
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await Product.findOne({
                where: { 
                    id: req.params.id,
                    sellerId: req.seller.id
                }
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await product.update(req.body);
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Product,
                        as: 'product',
                        where: { sellerId: req.seller.id }
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching orders',
                error: error.message 
            });
        }
    }
}

export default SellerController;
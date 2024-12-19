import Product from '../models/Product.js';

class ProductController {
    async createProduct(req, res) {
        try {
            const productData = req.body;
            if (req.file) {
                productData.image = `/uploads/${req.file.filename}`;
            }
            const product = await Product.create(productData);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            if (req.file) {
                updateData.image = `/uploads/${req.file.filename}`;
            }
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.update(updateData);
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }
}

export default ProductController;
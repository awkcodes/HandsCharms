import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sellerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Authentication required' });

        const decoded = jwt.verify(token,"your_jwt_secret_key");
        const user = await User.findByPk(decoded.id);

        if (!user || !user.isSeller) {
            return res.status(403).json({ message: 'Seller access required' });
        }

        req.seller = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default sellerAuth;
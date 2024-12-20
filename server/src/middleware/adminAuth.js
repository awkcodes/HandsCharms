import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== process.env.admin_email) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid admin token' });
  }
};

export default adminAuth;
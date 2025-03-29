import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    const tokenValue = token.split(' ')[1];  
    jwt.verify(tokenValue, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        const { role, id } = decoded.data;
        req.userRole = role;

        if (role === 'user') {
            req.userId = id;
        } else if (role === 'admin') {
            req.adminId = id;
        } else {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
    });
};

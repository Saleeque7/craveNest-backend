import jwt from 'jsonwebtoken'
import config from '../../config/config.js'
export const veriftyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' })
    }

    jwt.verify(token.split(' ')[1], config.JWT_SECRET, (err, decoded) => {

        if (err) {
            console.log(err, "errr");
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        req.userId = decoded.data.id;
        if (!req.userId) {

            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
        next();
    });
}
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: "Please provide Authorization key and value in Header"});
    }

    token = authHeader.split(' ')[1]; 
    if(!token) {
        return res.status(401).json({message: "Unauthorized, no token provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-passwordHash');
    } catch(error) {
        return res.status(401).json({ message: "Unauthorized, token failed or expired"})
    }
}

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({message:"Access denied:  Admin privileges required"});
    }
}

export {protect, adminOnly};
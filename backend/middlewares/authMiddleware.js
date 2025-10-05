const jwt = require('jsonwebtoken');
require('dotenv').configure();

const tokenBlacklist = new Set();

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    if (tokenBlacklist.has(token)) return res.status(401).json({ message: 'Access Denied: Token has been revoked' });


    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        next();
    });
};

const invalidateToken = (token) => {
    tokenBlacklist.add(token);
};

module.exports = {verifyToken, invalidateToken};
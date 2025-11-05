const jwt = require('jsonwebtoken');
require('dotenv').config();

//blacklist of tokens that we have invalidated
const tokenBlacklist = new Set();

//checks and verifies token is valid
const verifyToken = (req, res, next) => {
    //stripping the header and getting the auth field from header
    const authHeader = req.headers['authorization'];
    //split after space
    const token = authHeader && authHeader.split(' ')[1];

    //if no token = 401 unauthorized
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    //if the token is in our blacklist, 401 unauthorized
    if (tokenBlacklist.has(token)) return res.status(401).json({ message: 'Access Denied: Token has been invalidated' });

    //verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        //403 - not allowed
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        next();
    });
};

const invalidateToken = (token) => {
    tokenBlacklist.add(token);
};

module.exports = {verifyToken, invalidateToken};
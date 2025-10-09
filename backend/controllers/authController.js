const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

require('dotenv').config();

// Fixed: return the signed token
const generateJwt = (username) => {
    return jwt.sign(
        { username }, // payload must be an object
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // token valid for 1 hour
    );
};

const register = async (req, res) => {
    const { username, password, idNum, accNum } = req.body;
    try {
        // check if user already exists
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: "Username already exists" });

    //hashed pw with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user
    await User.create({
      username,
      idNum,
      accNum,
      password: hashedPassword
    });

        // return token
        const token = generateJwt(username);
        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({ username });
        if (!exists) return res.status(400).json({ message: 'Invalid credentials' });

        const matching = await bcrypt.compare(password, exists.password);
        if (!matching) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateJwt(username);
        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(400).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ message: 'No token provided' });

    invalidateToken(token);
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };

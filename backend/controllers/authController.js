const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

require('dotenv').config();

// Fixed: return the signed token
//Generates and returns a jwt token
const generateJwt = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username }, // payload must be an object
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
    const createdUser = await User.create({
      username,
      idNum,
      accNum,
      password: hashedPassword
    });

        //issue token
        const token = generateJwt(createdUser);

        res.status(200).json({ 
            token, 
            user: { id: createdUser._id, username: createdUser.username } 
        });


    } catch (e) {
        res.status(500).json({ error: e.message });
    }

};

const login = async (req, res) => {
    
    let { username, password, accountNumber } = req.body;

    username = String(username).trim();
    password = String(password);
    accountNumber = String(accountNumber).trim();

    if (!username || !password || !accountNumber) {
        return res.status(400).json({ message: "All fields are required and must be strings" });
    }

    try {
        
        console.log("Attempting to find user with username:", username, "and accNum:", accountNumber);

        const foundUser = await User.findOne({ username, accNum: accountNumber  });
        console.log("Found user:", foundUser);
        if (!foundUser) return res.status(400).json({ message: 'Invalid credentials' });

        const matching = await bcrypt.compare(password, foundUser.password);
        if (!matching) return res.status(400).json({ message: 'Invalid credentials' });

        //issue token
        const token = generateJwt(foundUser);
        res.status(200).json({ token });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


//Token is blacklisted when user logs out
const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(400).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ message: 'No token provided' });

    invalidateToken(token);
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };

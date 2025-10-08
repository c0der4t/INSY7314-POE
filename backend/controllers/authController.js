const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
require('dotenv').configure();

const generateJwt = (username) => {
    //signs it using the secret from our .env file
    jwt.sign(username, process.env.JWT_SECRET,  {
        // set an expiry of 1 hour from signing 
        expiresIn: '1h' //token valid for 1 hour
    });
    //and returns it
}

const register = async (req, res) => {
    //pull the required info from the incoming request
    const { username, password, idNum, accNum } = req.body;
    try {
        // check if user already exists
        const exists = await User.findOne({ username: username });
        if (exists) return res.status(400).json({ message: "Username already exists" });

        // hash password (with salt rounds = 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        await User.create({
            username,
            idNum,
            accNum,
            password: hashedPassword
        });

        // return token
        res.status(200).json({ token: generateJwt(username) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try{
    const exists = await User.findOne({username: username})
    //if the user is not present in our collection, let them know to try again
    if (!exists) return res.status(400).json({message: 'Invalid credentials'});
    // next, if the user DOES exist, we compare their entered password to what we have on file
    const matching = await bcrypt.compare(password, exists.password);
    //if they dont match, return invalid credentials message
    if(!matching) return res.status(400).json({message: 'Invalid credentials'});
    //otherwise, generate a token and log them in
    res.status(200).json({token: generateJwt(username)});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

const logout = async (req, res) => {
    //strip the header
    const authHeader = req.header['authorization'];
    //get the token (bearer: <token>)
    const token = authHeader.split(" ")[1];
    // check if there is indeed a token, if not, tell the user
    if (!token) return res.status(400).json({message: 'No token provided'});
    //otherwise invalidate the token
    invalidateToken(token);
    // and log them out
    res.status(200).json({message: "Logged out successfully"});
}

module.exports = {register, login, logout};
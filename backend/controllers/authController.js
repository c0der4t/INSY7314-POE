const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

require('dotenv').config();

const generateJwt = (username) => {
  //signs it using the secret from our .env file
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

const register = async (req, res) => {
    //pull the required info from the incoming request
  const { username, password, idNum, accNum } = req.body;
  // check if user already exists
  try {
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

    const token = generateJwt(username);
    //return token
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    //if the user is not present in our collection, let them know to try again
    if (!exists) return res.status(400).json({ message: 'Invalid credentials' });

    const matching = await bcrypt.compare(password, exists.password);
    //if they dont match, return invalid credentials message
    if (!matching) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateJwt(username);
    //otherwise, generate a token and log them in
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logout = async (req, res) => {
  //strip the header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // check if there is indeed a token, if not, tell the user
  if (!token) return res.status(400).json({ message: 'No token provided' });
  //otherwise invalidate the token  
  invalidateToken(token);
  // and log them out
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };

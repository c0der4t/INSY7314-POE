const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { invalidateToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

require('dotenv').config();

const ONE_YEAR_MS = Math.floor(365.25 * 24 * 60 * 60 * 1000);

// Rate limiter: max 10 failed attempts per IP over 1 year
// Rate limiting - max= number of requests, winodwsMs= period of time resuts are made in
 //Raddy Z, 2022.
const BruteForceIPLimiter = rateLimit({
  windowMs: ONE_YEAR_MS,
  max: 10,
  message: {
    status: 429,
    message: "Too many failed login attempts from this IP — blocked for 1 year."
  }
});

// JWT helper
const generateJwt = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

const register = async (req, res) => {
  const { username, password, idNum, accNum } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      idNum,
      accNum,
      password: hashedPassword
    });

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
  let { username, password, accNum, accountNumber } = req.body;

  username = String(username || '').trim();
  password = String(password || '');
  const acc = String((accNum ?? accountNumber) || '').trim();

  if (!username || !password || !acc) {
    return res.status(400).json({ message: "All fields are required and must be strings" });
  }

  try {
    const foundUser = await User.findOne({ username, accNum: acc }).select('+password');

    if (!foundUser) {
      await BruteForceIPLimiter.increment(req, res); // increment on failed login
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const matching = await bcrypt.compare(password, foundUser.password);
    if (!matching) {
      await BruteForceIPLimiter.increment(req, res); // increment on failed login
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await BruteForceIPLimiter.resetKey(req.ip); // reset on successful login

    const token = generateJwt(foundUser);
    return res.status(200).json({ token });

  } catch (e) {
    return res.status(500).json({ error: e.message });
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

//references:
  //Raddy Z, 2022. NodeJs Limiting Network Traffic - Express, Express Rate Limit. [video] YouTube. Available at: https://www.youtube.com/watch?v=VZZLiVccwKk&t=213s[Accessed 10 October 2025].

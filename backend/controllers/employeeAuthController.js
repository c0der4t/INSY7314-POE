const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const Employee = require('../models/employeeModel');

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
const signStaffJwt = (emp) => jwt.sign(
  { username: emp.username, role: emp.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Login controller
const loginEmployee = async (req, res) => {
  const username = String(req.body.username || '').trim();
  const accNum = String(req.body.accNum ?? req.body.accountNumber ?? '').trim();
  const password = String(req.body.password || '');

  if (!username || !password) {
    return res.status(400).json({ message: 'Make sure you fill out all fields.' });
  }

  try {
    const emp = await Employee.findOne({ username, accountNum: accNum }).select('+password');

    if (!emp) {
      await BruteForceIPLimiter.increment(req, res); // increment on failed login
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, emp.password);

    if (!ok) {
      await BruteForceIPLimiter.increment(req, res); // increment on failed login
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await BruteForceIPLimiter.resetKey(req.ip); // reset on successful login

    const token = signStaffJwt(emp);
    return res.status(200).json({ token, role: emp.role });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { loginEmployee };

//references:
  //Raddy Z, 2022. NodeJs Limiting Network Traffic - Express, Express Rate Limit. [video] YouTube. Available at: https://www.youtube.com/watch?v=VZZLiVccwKk&t=213s[Accessed 10 October 2025].

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const Employee = require('../models/employeeModel');



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
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, emp.password);

    if (!ok) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = signStaffJwt(emp);
    return res.status(200).json({ token, role: emp.role });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { loginEmployee };

//references:
  //Raddy Z, 2022. NodeJs Limiting Network Traffic - Express, Express Rate Limit. [video] YouTube. Available at: https://www.youtube.com/watch?v=VZZLiVccwKk&t=213s[Accessed 10 October 2025].

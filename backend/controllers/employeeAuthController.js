const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Employee = require('../models/employeeModel');


const signStaffJwt = (emp) => jwt.sign(
  { username: emp.username, role: emp.role }, //payload must be an object
  process.env.JWT_SECRET,
  { expiresIn: '1h' } //token valid for an hour
);


const loginEmployee = async (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required and must be strings' });
  }

  try {
    const emp = await Employee.findOne({ username });
    if (!emp) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, emp.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signStaffJwt(emp);
    return res.status(200).json({ token, role: emp.role });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { loginEmployee };

const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

// list employee accounts
const listEmployees = async (req, res) => {
  const employees = await Employee.find({}, { password: 0 }).sort({ username: 1 });
  res.json(employees);
};

// create employee
const createEmployee = async (req, res) => {
  const username = String(req.body.username || '').trim();
  const email = req.body.email ? String(req.body.email).trim() : undefined;
  const password = String(req.body.password || '');
  const role = (req.body.role === 'ADMIN' ? 'ADMIN' : 'EMPLOYEE');
  const accNum = String((req.body.accNum ?? req.body.accountNumber ?? '')).trim();

  if (!username || !password || !accNum) {
    return res.status(400).json({ message: 'Username, password and account number required' });
  }

  const exists = await Employee.findOne({ $or: [{ username }, { accountNum: accNum }] });
  if (exists) return res.status(400).json({ message: 'Username or account number already exists' });

  const hash = await bcrypt.hash(password, 10);
  const emp = await Employee.create({ username, email, password: hash, role, accountNum: accNum });

  res.status(201).json({ id: emp._id, username: emp.username, accountNum: emp.accountNum, role: emp.role });
};

// delete employee account by account number
const deleteEmployee = async (req, res) => {
  const accNum = String(req.params.accNum || '').trim();
  if (!accNum) return res.status(400).json({ message: 'Account number required' });

  const deleted = await Employee.findOneAndDelete({ accountNum: accNum, role: 'EMPLOYEE' });
  if (!deleted) return res.status(404).json({ message: 'Employee not found' });

  res.json({ ok: true });
};

module.exports = { listEmployees, createEmployee, deleteEmployee };

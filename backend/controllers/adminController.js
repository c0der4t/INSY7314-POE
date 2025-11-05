const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

//get all the employee accounts
const listEmployees = async (req, res) => {
  const employees = await Employee.find({}, { password: 0 }).sort({ createdAt: -1 });
  res.json(employees);
};

//creating an employee account
const createEmployee = async (req, res) => {
  const username = String(req.body.username || '').trim();
  const email = req.body.email ? String(req.body.email).trim() : undefined;
  const password = String(req.body.password || '');
  const role = (req.body.role === 'ADMIN' ? 'ADMIN' : 'EMPLOYEE');

  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const exists = await Employee.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Username already exists' });

  const hash = await bcrypt.hash(password, 10);
  const emp = await Employee.create({ username, email, password: hash, role });
  res.status(201).json({ id: emp._id, username: emp.username, role: emp.role });
};

//deleting an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const found = await Employee.findById(id);
  if (!found) return res.status(404).json({ message: 'Employee not found' });
  await Employee.findByIdAndDelete(id);
  res.json({ ok: true });
};

module.exports = { listEmployees, createEmployee, deleteEmployee };

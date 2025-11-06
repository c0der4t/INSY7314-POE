const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true },
  accountNum: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE'], required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

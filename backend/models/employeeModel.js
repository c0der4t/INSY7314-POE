const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true }, // bcrypt hash
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE'], required: true },
}, { timestamps: true });


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

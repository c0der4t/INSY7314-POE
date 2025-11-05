const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, //admin & employee
  email: { type: String },
  password: { type: String, required: true },//bcrypt hashed and salted
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE'], required: true }, //role-based access
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

//expose it to the rest of the app
module.exports = Employee;
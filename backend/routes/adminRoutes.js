const express = require('express');
const { requireStaffAuth, requireRole } = require('../middlewares/staffAuth');
const { validateInputs } = require('../middlewares/validateInputs');
const { listEmployees, createEmployee, deleteEmployee } = require('../controllers/adminController');

const router = express.Router();

router.get('/employees',  requireStaffAuth, requireRole('ADMIN'), listEmployees);
router.post('/employees', requireStaffAuth, requireRole('ADMIN'), validateInputs, createEmployee);
router.delete('/employees/:accNum', requireStaffAuth, requireRole('ADMIN'), deleteEmployee);

module.exports = router;

const express = require('express');
const { requireStaffAuth, requireRole } = require('../middlewares/staffAuth');
const {
  getPendingPayments,
  decidePayment,
  getPaymentHistory,
} = require('../controllers/employeePaymentsController');

const router = express.Router();

//endpoints for employee role (Role based access control)
router.get('/payments/pending',
  requireStaffAuth, requireRole('EMPLOYEE'), getPendingPayments);

router.put('/payments/:id',
  requireStaffAuth, requireRole('EMPLOYEE'), decidePayment);

router.get('/payments/history',
  requireStaffAuth, requireRole('EMPLOYEE'), getPaymentHistory);

module.exports = router;

const express = require('express');
const Payment = require('../models/paymentModel');
const { requireStaffAuth, requireRole } = require('../middlewares/staffAuth');

const router = express.Router();

//get all pending payments
router.get('/payments/pending', requireStaffAuth, requireRole('EMPLOYEE'), async (req, res) => {
  const items = await Payment.find({ status: 'PENDING' }).sort({ createdAt: -1 });
  res.json(items);
});

//approving or denying a payment
router.put('/payments/:id', requireStaffAuth, requireRole('EMPLOYEE'), async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body || {};
  if (!['APPROVED','DENIED'].includes(decision)) {
    return res.status(400).json({ message: 'Please approve or deny the payment' });
  }
  const updated = await Payment.findByIdAndUpdate(id, { status: decision }, { new: true });
  if (!updated) return res.status(404).json({ message: 'Payment not found' });
  res.json(updated);
});

//get payments that have been approved or denied
router.get('/payments/history', requireStaffAuth, requireRole('EMPLOYEE'), async (req, res) => {
  const items = await Payment.find({ status: { $ne: 'PENDING' } }).sort({ updatedAt: -1 });
  res.json(items);
});

module.exports = router;

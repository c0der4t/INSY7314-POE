const Payment = require('../models/paymentModel');

//get pending payments
const getPendingPayments = async (req, res) => {
  const items = await Payment.find({ status: 'PENDING' });
  res.json(items);
};

//update payment status
const decidePayment = async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body || {};
  if (!['APPROVED', 'DENIED'].includes(decision)) {
    return res.status(400).json({ message: 'Please approve or deny the payment' });
  }
  const updated = await Payment.findByIdAndUpdate(
    id,
    { status: decision },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Payment not found' });
  res.json(updated);
};

//get the payment history not pending payments
const getPaymentHistory = async (req, res) => {
  const items = await Payment
    .find({ status: { $ne: 'PENDING' } })
    .sort({ updatedAt: -1 });
  res.json(items);
};

module.exports = {
  getPendingPayments,
  decidePayment,
  getPaymentHistory,
};

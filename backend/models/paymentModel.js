const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentProviderCode: String,
  destinationAccount: String,
  paymentProvider: String,
  currency: String,
  amount: Number,
  transactionHash: String,
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'DENIED'],
    default: 'PENDING'
  }
}, { timestamps: true });


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
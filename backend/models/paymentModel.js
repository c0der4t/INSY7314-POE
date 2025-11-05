const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    paymentProviderCode: { type: String, required: true },
    destinationAccount: { type: String, required: true },
    paymentProvider: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
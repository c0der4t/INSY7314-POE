const bcrypt = require('bcrypt');
const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const addPayment = async (req, res) => {

    const { amount, currency, paymentProvider, destinationAccount, paymentProviderCode } = req.body;

    try {

        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

        const token = authHeader.split(' ')[1]?.trim();
        if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });


        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

        } catch (err) {

            return res.status(403).json({ message: 'Invalid Token' });
        }        

        const currentDate = new Date().toISOString();
        const concatRow = paymentProviderCode + destinationAccount + paymentProvider + currency + amount + currentDate;
        const hashedRow = await bcrypt.hash(concatRow, 10);

        const payment =  await Payment.create({
            amount,
            currency,
            paymentProvider,
            destinationAccount,
            paymentProviderCode,
            transactionHash: hashedRow,
            createdAt: currentDate
        });

        console.log('Added new payment:', payment);

        res.status(200).json({ message: 'Payment added successfully', paymentId: payment._id });

    } catch (e) {

        res.status(500).json({ error: e.message });
    }
};


module.exports = { addPayment };
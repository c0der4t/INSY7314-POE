const express = require('express');
const { validateInputs } = require('../middlewares/validateInputs');
const { verifyToken } = require('../middlewares/authMiddleware')
const { addPayment } = require('../controllers/paymentController.js');

const router = express.Router()

router.post('/add', verifyToken, validateInputs, addPayment);

module.exports = router;
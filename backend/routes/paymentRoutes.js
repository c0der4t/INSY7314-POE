const express = require('express');
const { validateInputs } = require('../middlewares/validateInputs');
const { verifyToken } = require('../middlewares/authMiddleware')
const { payment } = require('../controllers/paymentController')

const router = express.Router()

router.post('/create', verifyToken, validateInputs, payment)

module.exports = router;

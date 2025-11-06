const express = require('express');
const { loginEmployee } = require('../controllers/employeeAuthController');
const { validateInputs } = require('../middlewares/validateInputs');
const { sanitizeInputs } = require('../middlewares/sanitizationMiddleware');

const router = express.Router();

router.post('/login', validateInputs, sanitizeInputs, loginEmployee);

module.exports = router;

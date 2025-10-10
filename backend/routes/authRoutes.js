const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { validateInputs } = require('../middlewares/validateInputs')
const { sanitizeInputs } = require('../middlewares/sanitizationMiddleware')


const router = express.Router();
//require the username and pw from the user
router.post('/register', validateInputs, sanitizeInputs, register);
router.post('/login', validateInputs, sanitizeInputs,login);
//logout is a get request, as we are just reading the token from thr request header
router.get('/logout', logout);

module.exports = router;
const express = require('express');
const { register, login, logout } = require('../controllers/authController');


const router = express.Router();
//require the username and pw from the user
router.post('/register', register);
router.post('/login', login);
//logout is a get request, as we are just reading the token from thr request header
router.get('/logout', logout);

module.exports = router;
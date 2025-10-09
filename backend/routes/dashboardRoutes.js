const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware'); 
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', verifyToken, getDashboardData);

module.exports = router;

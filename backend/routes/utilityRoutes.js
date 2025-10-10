const express = require('express')
const utilityController = require('../controllers/utilityController.js')
const router = express.Router();


router.get('/healthCheck', utilityController.healthCheck)

module.exports = router

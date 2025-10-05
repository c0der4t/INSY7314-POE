const express = require('express')
const testController = require('../controllers/utilityController.js')
const router = express.Router();


router.get('/healthCheck', utilityController.healthCheck)

module.exports = router

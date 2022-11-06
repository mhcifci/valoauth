const express = require('express');
const router = express.Router();
const  { 
    DailyMarketCodes
} = require('../controllers/Market/DailyMarketCodesController')

// Get JWT token and Access Token
router.post("/daily", DailyMarketCodes);

module.exports = router;
const express = require('express');
const router = express.Router();
const  { 
    DailyMarketCodes
} = require('../controllers/Market/DailyMarketCodesController')

// Get Daily Market Item Codes
router.post("/daily", DailyMarketCodes);

module.exports = router;
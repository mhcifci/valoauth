const express = require('express');
const router = express.Router();
const  { 
    DailyMarketCodes
} = require('../controllers/Market/DailyMarketCodesController')
const postMiddleware = require("../middlewares/post.middleware");

router.post("/daily", postMiddleware, DailyMarketCodes);

module.exports = router;
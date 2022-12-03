const express = require('express');
const router = express.Router();
const  { 
    UserWalletController
} = require('../controllers/Wallet/UserWalletController')

// Get Daily Market Item Codes
router.post("/balance", UserWalletController);

module.exports = router;
const express = require('express');
const router = express.Router();
const  { 
    UserWalletController
} = require('../controllers/Wallet/UserWalletController')
const postMiddleware = require("../middlewares/post.middleware");

router.post("/balances", postMiddleware, UserWalletController);
module.exports = router;
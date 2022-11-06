const express = require('express');
const router = express.Router();
const  { 
    Login,
} = require('../controllers/Login/LoginController')

// Get JWT token and Access Token
router.post("/login", Login);

module.exports = router;
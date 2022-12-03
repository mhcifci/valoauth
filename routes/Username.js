const express = require('express');
const router = express.Router();
const  { 
    UsernameController,
} = require('../controllers/User/UsernameController')

// Get JWT token and Access Token
router.post("/", UsernameController);

module.exports = router;
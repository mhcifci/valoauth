const express = require('express');
const router = express.Router();
const  { 
    Login,
} = require('../controllers/Login/LoginController')
const loginMiddleware = require("../middlewares/login.middleware");

router.post("/login", loginMiddleware, Login);

module.exports = router;
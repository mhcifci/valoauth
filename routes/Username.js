const express = require('express');
const router = express.Router();
const  { 
    UsernameController,
} = require('../controllers/User/UsernameController')
const postMiddleware = require("../middlewares/post.middleware");

router.post("/", postMiddleware,  UsernameController);

module.exports = router;
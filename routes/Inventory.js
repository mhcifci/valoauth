const express = require('express');
const router = express.Router();
const  { 
    InventoryController
} = require('../controllers/Inventory/InventoryController')
const postMiddleware = require("../middlewares/post.middleware");

router.post("/", postMiddleware, InventoryController);
module.exports = router;
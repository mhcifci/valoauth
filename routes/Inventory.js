const express = require('express');
const router = express.Router();
const  { 
    InventoryController
} = require('../controllers/Inventory/InventoryController')

router.post("/", InventoryController);

module.exports = router;
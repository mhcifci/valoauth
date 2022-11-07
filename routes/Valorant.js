const express = require('express');
const router = express.Router();
const  { 
    GetValorantSkinController
} = require('../controllers/ValorantAPI/GetValorantSkinController')

// Get Valorant-API 
router.post("/skins", GetValorantSkinController);

module.exports = router;
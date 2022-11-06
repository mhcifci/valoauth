const express = require('express');
const router = express.Router();
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API(Valorant.Regions.Europe);

router.get("/login", (req, res) => {

    let userData =  [];
    valorantApi.authorize('mahmutcannx', '2146422Mahmut').then(() => {
        data = {
            "user_id": valorantApi.user_id,
            "access_token": valorantApi.access_token,
            "entitlements_token": valorantApi.entitlements_token,
        }
        userData.push(data);
        res.status(200).json({
            "status": 200,
            "result": "success",
            "data": userData
        });
    }).catch((error) => {
        res.status(500).json({
            "status": 400,
            "result": "false",
            "message": "Bad request!",
            "data"  : error
        });
    });
});

module.exports = router ;
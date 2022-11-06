const express = require('express');
const router = express.Router();
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API(Valorant.Regions.Europe);

let bodyParser = require('body-parser');
const { json } = require('express');
router.use(bodyParser.json());

router.post("/login", (req, res) => {

    console.log ( req.body );   

    const id = req.body.id;
    const pass = req.body.pass;

    if (id == undefined || pass === undefined) {
        res.status(400).json({
            "status": "error",
            "message": "Please fill your ID and Password!"
        });
        return false;
    }
    valorantApi.authorize(id, pass).then(() => {
        data = {
            "user_id": valorantApi.user_id,
            "access_token": valorantApi.access_token,
            "entitlements_token": valorantApi.entitlements_token,
        }
        res.status(200).json({
            "status": "success",
            "data": data
        });
    }).catch((error) => {
        res.status(400).json({
            "status": "error",
            "message": "Bad request!",
            "data": error
        });
    });

});

module.exports = router;
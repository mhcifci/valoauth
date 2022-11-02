const express = require('express');
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API(Valorant.Regions.Europe);
//const axios = require('axios');
const app = express();
const PORT = 3000;
app.listen(PORT, () => {});

// Let authenticate and get UID, ACT, ETT
app.get("/login", (req, res) => {
    valorantApi.authorize('mahmutcannx', '2146422Mahmut').then(() => {
        let data = {
            "user_id": valorantApi.user_id,
            "access_token": valorantApi.access_token,
            "entitlements_token": valorantApi.entitlements_token,
        }
        userData.push(data);
        let response = {
            "status" : 200,
            "result" : "success",
            "data"   : userData
        }
        res.status(200).json(response);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});


/*
app.post("/wallet", (req, res) => {
        
});
*/



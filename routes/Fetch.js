const express = require('express');
const router = express.Router();
const axios = require('axios');


// For POST-Support
let bodyParser = require('body-parser');
const { json } = require('express');
router.use(bodyParser.json());


// For base url
const baseUrl = "https://pd.eu.a.pvp.net/store/v2/";

// This method for getting dailyStore items & Skins. Just gaming code here..
router.post("/dailyStore", (req, res) => {

    useMethod = "storefront/";

    // Get the post data from postman & etc.to here..
    const userId = req.body.user_id;
    const accessToken = req.body.access_token;
    const entitlementsToken = req.body.entitlements_token;


    // Checking post data when data is undefined return with 418! 
    if (userId == undefined || accessToken == undefined || entitlementsToken == undefined) {
        data = {
            "status": "error",
            "message": "User ID, access token, entitlements token are missing"
        }

        // Returning with data & 418!
        res.send(data, 418);
        // Off the connection
        return false;
    }


    let runAsync = async () => {
        let getInfo = await axios.get(baseUrl + useMethod + userId, {
            headers: {
                'Content-Type': 'application/json',
                'X-Riot-Entitlements-JWT': entitlementsToken,
                'Authorization': 'Bearer ' + accessToken
            }

        });

        let valorantInfo = getInfo.data.SkinsPanelLayout.SingleItemOffers;

        let skinData = [];
        valorantInfo.forEach(function (item, index) {
            axios.get("https://valorant-api.com/v1/weapons/skinlevels/" + item)
                .then(function (response) {
                    skinData.push(response.data);
                }); 
        });
        console.log(skinData);  
    };
    runAsync();
    return false;

    axios.get(baseUrl + useMethod + userId, {
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Entitlements-JWT': entitlementsToken,
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(function (response) {
            const singleTimeOffers = response.data.SkinsPanelLayout.SingleItemOffers;
            data = {
                "status": "success",
                "data": singleTimeOffers,
            }
            res.send(data, 200);



        })
        .catch(function (err) {

            // If this situtation is have error, send back with error message and api error
            data = {
                "status": "error",
                "data": "An error has occurred, please try again later.",
                "detail": err
            }
            res.send(data, 400);
        });
});



module.exports = router;
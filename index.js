const express = require('express');
const axios = require('axios');
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API(Valorant.Regions.Europe);
const ValorantChecker = require('./functions');
const app = express();
const PORT = 3001;
app.listen(PORT, () => {});


// Let authenticate and get UID, ACT, ETT
app.get("/login", (req, res) => {

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


app.get("/dailyStore", (req, res) => {

    let user_id = "1ca72146-1fb0-59bd-9e9d-f33a2bc1093e";
    let access_token = "eyJraWQiOiJzMSIsImFsZyI6IlJTMjU2In0.eyJwcCI6eyJjIjoiZXUifSwic3ViIjoiMWNhNzIxNDYtMWZiMC01OWJkLTllOWQtZjMzYTJiYzEwOTNlIiwic2NwIjpbImFjY291bnQiLCJvcGVuaWQiXSwiY2xtIjpbImZlZGVyYXRlZF9pZGVudGl0eV9wcm92aWRlcnMiLCJlbWFpbF92ZXJpZmllZCIsIm9wZW5pZCIsInB3IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIiwicmduX1RSMSIsImFjY3RfZ250IiwibG9jYWxlIiwiYWNjdCIsImFnZSIsImFjY291bnRfdmVyaWZpZWQiLCJhZmZpbml0eSJdLCJkYXQiOnsicCI6bnVsbCwiciI6IlRSMSIsImMiOiJlYzEiLCJ1IjoyMjkxMTg2ODI0ODY4NzA0LCJsaWQiOiJJOHcyR3BBOTFQelBiWnlFTXZzRDV3In0sImlzcyI6Imh0dHBzOlwvXC9hdXRoLnJpb3RnYW1lcy5jb20iLCJleHAiOjE2Njc0MjAzNDYsImlhdCI6MTY2NzQxNjc0NiwianRpIjoiSEpEREN3S0plSGciLCJjaWQiOiJwbGF5LXZhbG9yYW50LXdlYi1wcm9kIn0.CR3qRm-Epm82WmUGDKYqdvp6YbANPbNgu7pOBdatbNxC8a_qrN_COrnPBXYsJAHSG3udxCYt3UuHRgd5o1sgo4LMc0j4aVOWFuYq47vAIJOeeMYhF993NkOdPc9WAa6I7pQ70D9xmkHL18bExhXGxcGpLNZy5OQpo2RzvsTi_iA";
    let entitlements_token = "eyJraWQiOiJrMSIsImFsZyI6IlJTMjU2In0.eyJlbnRpdGxlbWVudHMiOltdLCJhdF9oYXNoIjoiSTNrVUdUdWxqTGR0U1BBOFFlQmFIdyIsInN1YiI6IjFjYTcyMTQ2LTFmYjAtNTliZC05ZTlkLWYzM2EyYmMxMDkzZSIsImlzcyI6Imh0dHBzOlwvXC9lbnRpdGxlbWVudHMuYXV0aC5yaW90Z2FtZXMuY29tIiwiaWF0IjoxNjY3NDE2NzQ3LCJqdGkiOiJISkREQ3dLSmVIZyJ9.UqL3d6vooYZOdAsEQOQ8r5H7Qgha9StHHwvJA2thgMc1TCnvV6_9cGA_EBxhNo0l-CnfuQ1f6HcUiXUvmzVGAmGtTq4RZiWaxve4KwXSCQYeL1QYac_hghyq-reU2CYci4fEDZTqHjwqKu42nvavX2v25iQ4TjL4jXTfk2g2MNfEIFMp9bM95GNOIdrE2EklELVRTt0xKZtvxbIlpnJGINCiVijzD5mQVtejMvy3wV6YTDBZo-3mrjwtiNAaSbOhZezhjNqEuczPIoFznkcqynRfTUxRJAwtnDmxS-nNRm4ipjS7UeXbwRknK4GFJ5zNsuOz8F8aXHrnUtJ3bUTplg";

    axios.get("https://pd.eu.a.pvp.net/store/v2/storefront/" + user_id, {
            headers: {
                'Content-Type': 'application/json',
                'X-Riot-Entitlements-JWT': entitlements_token,
                'Authorization': 'Bearer ' + access_token
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
});
/* To -Do */
/* 

   -- Write class for ValorantChecker. and Check this
   -- Write dailystore endpoint 
   --- Authenticated user get token & user ID give For ex 
   [
       {
            "name"  : xxxx
            "image" : xxxx
            "price" : xxxx
       },
       {
            "name"  : xxxx
            "image" : xxxx
            "price" : xxxx
       },
       {
            "name"  : xxxx
            "image" : xxxx
            "price" : xxxx
       },
       {
            "name"  : xxxx
            "image" : xxxx
            "price" : xxxx
       },
       {
            "name"  : xxxx
            "image" : xxxx
            "price" : xxxx
       },

   ]

*/
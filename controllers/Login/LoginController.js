const express = require('express');
const Valorant = require('@liamcottle/valorant.js');
const valorantApi = new Valorant.API(Valorant.Regions.Europe);

const Login = ((req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    if (!id || !password) {
        res.status(403).json({
            "status": "error",
            "message": "Please fill your ID and passwordword!"
        });
    }
    valorantApi.authorize(id, password)
    .then(() => {
        data = {
            "user_id": valorantApi.user_id,
            "access_token": valorantApi.access_token,
            "entitlements_token": valorantApi.entitlements_token,
        }
        res.status(200).json({
            "status": "success",
            "data": data
        })
    }).catch(() => {
        res.status(403).json({
            "status": "error",
            "message": "User information is incorrect!",
            "data": {
                "id" : id,
                "password" : password
            }
        });
    });
});

module.exports = {
    Login
}
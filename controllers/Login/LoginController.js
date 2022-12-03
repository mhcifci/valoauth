const Valorant = require('@liamcottle/valorant.js');
/*const Regions = {
    AsiaPacific: 'AP',
    Europe: 'EU',
    Korea: 'KO',
    NorthAmerica: 'NA',
}*/

// burada regiona göre login olmuyor işimiz çok rahat...

const Login = ((req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const region = req.body.region;

    if (!id || !password || !region) {
        res.status(403).json({
            "status": "error",
            "message": "Please check your post fields"
        });
        return false;
    }
  
    const valorantApi = new Valorant.API();
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
    }).catch((e) => {
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
const axios = require('axios');




const fetchSkin = async (skins) => {

    await skins.map(item => {
        axios.get("https://valorant-api.com/v1/weapons/skinlevels/" + item)
            .then((response) => {
                console.log(response.data);
            }).catch((err) => {
                return err;
            });
    });
}

const GetValorantSkinController = async (req, res) => {
    const skins = req.body.skins;
    if (!skins) {
        res.status(403).json({
            "status": "error",
            "message": "Please type your Skin UUID"
        });
    }
    const data = await fetchSkin(skins);

};

module.exports = {
    GetValorantSkinController
}
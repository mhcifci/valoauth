const axios = require("axios");

const GetValorantSkinController = async (req, res) => {
  const skins = req.body.skins;

  if (typeof skins === "object") {
    let skinArr = [];
    for (let index = 0; index < skins.length; index++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/weapons/skinlevels/" + skins[index]
      );
      skinArr.push(result.data);
    }
    res.status(200).json(skinArr);
  }
};

module.exports = {
  GetValorantSkinController,
};

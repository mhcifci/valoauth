const axios = require("axios");
const apiService = require("../../services/api.service");

async function getValorantSkins(skins, lang = "en-US") {
  if (typeof skins === "object") {
    let skinArr = [];
    for (let index = 0; index < skins.length; index++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/weapons/skinlevels/" + skins[index] + "?language="+lang
      );
      skinArr.push(result.data.data);
    }
    return skinArr;
  }
}

const DailyMarketCodes = async (req, res) => {
  const userId = req.body.user_id;
  const accessToken = req.body.access_token;
  const entitlementsToken = req.body.entitlements_token;
  const region = req.body.region;
  const lang = req.body.lang;
  const valorantService = new apiService(
    region,
    userId,
    accessToken,
    entitlementsToken
  );
  valorantService.getPlayerStoreFront(userId) 
  .then((result) => {
    const skins = result.data.SkinsPanelLayout.SingleItemOffers;
    getValorantSkins(skins, lang).then((result) => {
      res.status(200).json({
        status: "success",
        data: result
      });
    });
  })
  .catch((err) => {
    if (err.toJSON().status == 400) {
      res.status(400).json({
        status: "false",
        code: "refresh_login",
        message: "Authorization failed, please try login again."
      });
    }
  });
};

module.exports = {
  DailyMarketCodes,
};

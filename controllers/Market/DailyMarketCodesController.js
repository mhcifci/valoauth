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

async function findAndGetPrice(items, data) {
  const valorantService = new apiService(data.region, data.userId, data.accessToken, data.entitlementsToken);
  let priceArr = [];
  for (let index = 0; index < items.length; index++) {
    const getStore = await valorantService.getStoreOfferPrice(data.userId);
    const find = await getStore.data.Offers.find(x => x.OfferID === items[index].uuid);
    let result = {
      item : items[index],
      price : Object.values(find.Cost).toString()
    }
    priceArr.push(result);
  };
  return priceArr;
}


const DailyMarketCodes = async (req, res) => {
  const userId = req.body.user_id;
  const accessToken = req.body.access_token;
  const entitlementsToken = req.body.entitlements_token;
  const region = req.body.region;
  const lang = req.body.lang;
  const data = {
    region,
    userId,
    accessToken,
    entitlementsToken
  }
  const valorantService = new apiService(data.region, data.userId, data.accessToken, data.entitlementsToken);
  valorantService.getPlayerStoreFront(userId) 
  .then((result) => {
    const skins = result.data.SkinsPanelLayout.SingleItemOffers;

    getValorantSkins(skins, lang).then((result) => {

      findAndGetPrice(result, data).then((resData) => {
        res.status(200).json({
          status: "success",
          data: resData
        });
      });
      return;
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

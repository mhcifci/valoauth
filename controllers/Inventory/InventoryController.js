const axios = require("axios");
const apiService = require("../../services/api.service");

async function getValorantWeapons(skins, lang = "en-US") {
  if (typeof skins === "object") {
    let skinArr = [];
    for (var i = 0; i < skins.length; i++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/weapons/skins/" +
          skins[i].SkinID +
          "?language=" +
          lang
      );
      skinArr.push(result.data.data);
    }
    return skinArr;
  }
}

async function getValorantSprays(skins, lang = "en-US") {
  if (typeof skins === "object") {
    let skinArr = [];
    for (var i = 0; i < skins.length; i++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/sprays/" +
          skins[i].SprayID +
          "?language=" +
          lang
      );
      skinArr.push(result.data.data);
    }
    return skinArr;
  }
}

const InventoryController = async (req, res) => {
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
  valorantService
    .getPlayerLoadout(userId)
    .then(async (result) => {
      const weapons = [];
      const sprays = [];
      await getValorantWeapons(result.data.Guns, lang).then((result) => {
        weapons.push(result);
      });
      await getValorantSprays(result.data.Sprays, lang).then((result) => {
        sprays.push(result);
      });
      res.status(200).json({
        status: "success",
        data: {
          weapons: weapons[0],
          sprays: sprays[0],
        },
      });
      return;
    })
    .catch((err) => {
      console.log(err);
      if (err.toJSON().status == 400) {
        res.status(400).json({
          status: "false",
          code: "refresh_login",
          message: "Authorization failed, please try login again."
        });
        return;
      }
    });
};

module.exports = {
  InventoryController,
};

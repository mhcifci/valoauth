const axios = require("axios");
const { restart } = require("nodemon");

async function getValorantWeapons(skins, lang = "en-US") {
  if (typeof skins === "object") {
    let skinArr = [];
    for (var i = 0; i < skins.length; i++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/weapons/skins/" + skins[i].SkinID + "?language="+lang
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
        "https://valorant-api.com/v1/sprays/" + skins[i].SprayID + "?language="+lang
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

  const baseUrl = "https://pd." + region + ".a.pvp.net/";
  const useMethod = "personalization/v2/players/" + userId + "/playerloadout";

  if (!userId || !accessToken || !entitlementsToken || !region) {
    res.status(418).json({
      status: "error",
      message: "Blap blap cort, isteğini bir kontrol et la!",
    });
  }
  await axios
    .get(baseUrl + useMethod, {
      headers: {
        "Content-Type": "application/json",
        "X-Riot-Entitlements-JWT": entitlementsToken,
        Authorization: "Bearer " + accessToken,
      },
    })
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
          sprays: sprays[0]
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({
        status: "error",
        data: err.message,
      });
    });
};

module.exports = {
  InventoryController,
};

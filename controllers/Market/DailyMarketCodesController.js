const axios = require("axios");
const { restart } = require("nodemon");

async function getValorantSkins(skins) {
  if (typeof skins === "object") {
    let skinArr = [];
    for (let index = 0; index < skins.length; index++) {
      let result = await axios.get(
        "https://valorant-api.com/v1/weapons/skinlevels/" + skins[index]
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

  const baseUrl = "https://pd.eu.a.pvp.net/store/v2/";
  const useMethod = "storefront/";

  if (!userId || !accessToken || !entitlementsToken) {
    res.status(418).json({
      status: "error",
      message: "Blap blap cort, isteğini bir kontrol et la!",
    });
  }
  await axios
    .get(baseUrl + useMethod + userId, {
      headers: {
        "Content-Type": "application/json",
        "X-Riot-Entitlements-JWT": entitlementsToken,
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((result) => {
      const skins = result.data.SkinsPanelLayout.SingleItemOffers;
      getValorantSkins(skins).then((result) => {
        res.status(200).json({
          status: "success",
          data: result
        });
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: "error",
        data: err.message,
      });
    });
};

module.exports = {
  DailyMarketCodes,
};

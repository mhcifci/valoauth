const axios = require("axios");
const { restart } = require("nodemon");

const UserWalletController = async (req, res) => {
  const userId = req.body.user_id;
  const accessToken = req.body.access_token;
  const entitlementsToken = req.body.entitlements_token;
  const region = req.body.region;

  const baseUrl = "https://pd." + region + ".a.pvp.net/store/v1/";
  const useMethod = "wallet/";

  if (!userId || !accessToken || !entitlementsToken || !region) {
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
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result.data.Balances,
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
  UserWalletController,
};

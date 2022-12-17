const apiService = require("../../services/api.service");
const UserWalletController = async (req, res) => {

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
  valorantService.getPlayerWallet(userId) 
  .then((data) => {
    res.status(200).json({
      status: "success",
      data: {
        vp : data.data.Balances["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"],
        rp : data.data.Balances["e59aa87c-4cbf-517a-5983-6e81511be9b7"]
      }
    });
  }).catch((err) => {
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
  UserWalletController,
};

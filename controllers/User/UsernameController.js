const apiService = require("../../services/api.service");

const UsernameController = async (req, res) => {
  const userId = req.body.user_id;
  const accessToken = req.body.access_token;
  const entitlementsToken = req.body.entitlements_token;
  const region = req.body.region;
  const valorantService = new apiService(
    region,
    userId,
    accessToken,
    entitlementsToken
  );
  valorantService
    .getPlayers(userId)
    .then(async(result) => {
      await valorantService.getPlayerExperience(userId)
      .then((exp) => {
        res.status(200).json({
          status: "success",
          data: result.data,
          experience : exp.data.Progress
        });
      });
    })
    .catch((err) => {
      if (err.toJSON().status == 400) {
        res.status(400).json({
          status: "false",
          code: "refresh_login",
          message: "Authorization failed, please try login again.",
        });
      }
    });
};

module.exports = {
  UsernameController,
};

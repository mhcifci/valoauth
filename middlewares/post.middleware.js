const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const postMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({
      status: "error",
      message: "Your token is expired, or null!",
    });
    return false;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({
        status: "error",
        message: "Please check your request!",
      });
      return false;
    }
    const userId = req.body.user_id;
    const accessToken = req.body.access_token;
    const entitlementsToken = req.body.entitlements_token;
    const region = req.body.region;
    const lang = req.body.lang;
    if (!userId || !accessToken || !entitlementsToken || !region || !lang) {
      res.status(418).json({
        status: "error",
        message: "Please check your post fields.",
      });
      return false;
    } else {
      next();
    }
  });
};

module.exports = postMiddleware;

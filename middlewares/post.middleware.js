const postMiddleware = (req,res,next) => {
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
  } else {
    next();
  }
};

module.exports = postMiddleware;

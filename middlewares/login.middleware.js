const postMiddleware = (req,res,next) => {
  const id = req.body.id;
  const password = req.body.password;
  const region = req.body.region;
  const lang = req.body.lang;
  if (!id || !password || !region || !lang) {
    res.status(418).json({
      status: "error",
      message: "Please check your post fields.",
    });
  } else {
    next();
  }
};

module.exports = postMiddleware;

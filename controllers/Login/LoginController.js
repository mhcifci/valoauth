const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../../database/index")();
var User = require("../../database/Schema");
const authService = require("../../services/auth.service");
dotenv.config();

function generateAccessToken(username) {
  return jwt.sign({username:username}, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

const Login = (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const region = req.body.region;
  const lang = req.body.lang;
  const appToken = generateAccessToken(id); // APP token JWT token

  const loginService = new authService();
  loginService
    .authorize(id, password)
    .then((data) => {
      User.findOne({ username: id })
        .then((user) => {
          if (user) {
            res.status(200).json({
              status: "success",
              data: data,
              app_token: appToken, // APP token JWT token
              region: region,
              lang: lang,
            });
          } else {
            new User({
              username: id,
              password: password,
            })
              .save()
              .then(() => {
                res.status(200).json({
                  status: "success",
                  data: data,
                  app_token: appToken, // APP token JWT token
                  region: region,
                  lang: lang,
                });
              })
              .catch(() => {
                res.status(200).json({
                  status: "success",
                  data: data,
                  app_token: appToken, // APP token JWT token
                  region: region,
                  lang: lang,
                });
              });
          }
        })
        .catch(() => {
          res.status(500).json({
            status: "error",
            code: "app_fail",
            message: "Currently app is under construction.",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json({
        status: "error",
        code: "login_fail",
        message: "User information is incorrect!",
        data: {
          id: id,
          password: password,
        },
      });
    });
};

module.exports = {
  Login,
};

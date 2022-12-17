const authService = require("../../services/auth.service");
const Login = ((req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const region = req.body.region;
    const lang = req.body.lang;

    const loginService = new authService();
    loginService.authorize(id, password)
    .then((data) => {
        res.status(200).json({
            "status": "success",
            "data": data,
            "region": region,
            "lang" : lang
        })
    }).catch(() => {
        res.status(403).json({
            "status": "error",
            "code" : "login_fail",
            "message": "User information is incorrect!",
            "data": {
                "id" : id,
                "password" : password
            }
        });
    });
});

module.exports = {
    Login
}
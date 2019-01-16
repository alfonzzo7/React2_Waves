const { User } = require('./../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    if (token) {
        User.findByToken(token, (err, user) => {
            if (err) throw err;

            if (!user) return res.json({
                isAuth: false,
                error: true
            });

            req.token = token;
            req.user = user;
            next();
        });
    } else {
        return res.json({
            isAuth: false,
            error: true
        });
    }
}

module.exports = { auth }
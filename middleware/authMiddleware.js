const jwt = require('jsonwebtoken');
const User = require ('../models/User')
const jwtSecret = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                //console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/');
    }
};

const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        res.redirect('dashboard');
        next()
    } else {
        next()
    }
};



const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser, isAuth };
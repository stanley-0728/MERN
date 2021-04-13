const passport = require('passport');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    User.findOne({ email }).lean().exec((error, user) => {
        done(error, user.email);
    });
});

const signinStrategy = require('./signinStrategy');
const signupStrategy = require('./signupStrategy');

passport.use('local-signin', signinStrategy);
passport.use('local-signup', signupStrategy);
module.exports = passport;
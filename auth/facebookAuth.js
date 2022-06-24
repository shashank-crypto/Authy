const passport = require('passport');
const facebookStratey = require('passport-facebook').Strategy;
const router = require('express').Router();

passport.use(new facebookStratey({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email']
}
    , (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, profile);
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
}
    , (err, user) => {
        done(err, user);
    }
);


passport.deserializeUser((user, done) => {
    done(null, user);
}
    , (err, user) => {
        done(err, user);
    }
);


router.get('/facebook', passport.authenticate('facebook'));


module.exports = router;
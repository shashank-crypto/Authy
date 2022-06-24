const passport = require('passport');
const router = require('express').Router();
const twitterStrategy = require('passport-twitter').Strategy;
const env = require('dotenv').config();

passport.use(new twitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
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
);


passport.deserializeUser((user, done) => {
    done(null, user);
}
);


router.get('/twitter', passport.authenticate('twitter'));


module.exports = router;
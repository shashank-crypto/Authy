const passport = require('passport');
const getUserByEmail = require('../controller/getUserByMail');
const router = require('express').Router();
const googleStratey = require('passport-google-oauth20').Strategy;
const saveUser = require('../controller/saveUser');
const connection = require('../db/conn');

passport.use(new googleStratey({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['email', 'profile', 'openid']
}
    , async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const user = await getUserByEmail(connection, profile.emails[0].value);
        if (user.length === 0) {
            const newUser = await saveUser(connection, uuidv4(), profile.displayName, profile.emails[0].value, 'google');
            console.log("newuser", newUser);
            done(null, newUser);
        }
        else{
            if(user.id !== profile.id){
            console.log(" email already registered with", user);
            }
            done(null, profile);
        }
    }
));


passport.serializeUser(async (user, done) => {
    done(null, user.id);
}
    // , (err, user) => {
    //     done(err, user);
    // }
);


passport.deserializeUser(async (id, done) => {
    done(null, id);
}
    // , (err, user) => {
    //     done(err, user);
    // }
);


router.get('/google', passport.authenticate('google'));

router.get('/google/callback', 
    passport.authenticate('google', 
    { failureRedirect: '/', successRedirect: '/api/users' }
    )
);


module.exports = router;
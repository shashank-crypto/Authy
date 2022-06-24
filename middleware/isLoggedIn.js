// check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    console.log("Not authenticated");
}


module.exports = isLoggedIn;
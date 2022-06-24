// check if user is logged in
const isLoggedIn = (req, res, next) => {
    console.log("user", req)
    if(!req.user) return res.status(401).json({'Error' : 'Not logged in'});
    next();
}


module.exports = isLoggedIn;
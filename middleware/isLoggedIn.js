// check if user is logged in
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    console.log("user", req)
    try {
        if (req.headers["authorization"])
        var decoded = jwt.verify(req.headers["authorization"].split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded["sub"];
        next();
    }
    catch(err) {
        return res.status(401).json({'Error' : `Not logged in - ${err}`});
    }
    
}


module.exports = isLoggedIn;
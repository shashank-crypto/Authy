const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
    const payload = {
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = createJwtToken;
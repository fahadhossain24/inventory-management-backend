const jwt = require('jsonwebtoken');

exports.genarateToken = (user) => {
    const payload = {
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '60s'
    })

    return token;
}
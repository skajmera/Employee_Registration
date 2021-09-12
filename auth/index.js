
const jwt = require("jsonwebtoken")
function generateAccessToken(username) {
    return jwt.sign(username, process.env.db_secret, { expiresIn: '18000s' });
}

function authenticateToken(req, res, next) {
    console.log(req.headers.cookie);
    const authHeader = req.headers.cookie
    console.log(authHeader);
    const token = authHeader.split('=')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.db_secret, (err, data) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        next()
    })

}

module.exports = { generateAccessToken, authenticateToken };
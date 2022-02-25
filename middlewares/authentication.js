const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

exports.verifyUser = (req, res, next) => {
    const token = req.headers["authorization"].split('Bearer ')[1]
    if (!token) return res.status(401).json({
        status: 'Unauthorized',
        message: 'Token must be provided'
    })

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(500).json({ 
            status: 'Unauthorized',
            message: 'Failed to authorize token'
        })

        req.user = user
        req.user["token"] = token

        next()
    })
}
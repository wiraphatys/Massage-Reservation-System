const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.protect = (async (req, res, next) => {
    let token;

    // Check headers of request
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    // Ensure that token is exist
    if (!token || token == 'null') {
        return res.status(401).send({
            success: false,
            message: "Not authorize to access this route"
        })
    }

    try {
        // verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        req.user = await User.findById(decoded.id)

        next()
    } catch (e) {
        console.log(e.stack)

        return res.status(401).send({
            success: false,
            message: "Not authorize to access this route"
        })
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route.`
            })
        }

        next();
    }
}
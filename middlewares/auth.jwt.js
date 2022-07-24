const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const constants = require('../utils/constants')

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) { return res.status(403).send({ message: "No token provided! Access Prohibited!" }) }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) { return res.status(401).send({ message: "Unauthorized" }) }
        req.userId = decoded.id;
        next()
    })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId })

    if (user && user.userType === constants.userTypes.admin) next();
    return res.status(403).send({ message: "Unauthorized, only Admins can access" })
}

module.exports = {
    verifyToken, isAdmin
}
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
    const all = await User.find({})
    console.log(all)
    console.log(req.userId, user)
    if (user && user.userType === constants.userTypes.admin) next();
    else return res.status(403).send({ message: "Unauthorized, only Admins can access" })
}

const isValidUserIdInReqParam = async (req, res, next) => {
    try {
        const user = await User.find({ userId: req.params.id })
        if (!user) return res.status(400).send({ message: "User does not exist" })
        next()
    } catch (err) { console.log("Error in isValidUserIdInReqParam", err); return res.status(500).send({ message: "Internal server error" }) }
}

const isAdminOrOwner = async (req, res, next) => {
    try {
        const callingUser = await User.findOne({ userId: req.userId })
        if (!callingUser) return res.status(404).send({ message: "User does not exist" })
        if (callingUser.userType === constants.userTypes.admin || callingUser.userId === req.params.id) { next() }
        else return res.status(401).send({ message: "Unauthorized" })
    } catch (err) { console.log("Error in isAdminOrOwner", err); return res.status(500).send({ message: "Internal server error" }) }
}

module.exports = {
    verifyToken, isAdmin, isValidUserIdInReqParam, isAdminOrOwner
}
const User = require('../models/user.model')
const Constants = require("../utils/constants")

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const validateSignUp = async (req, res, next) => {

    if (!req.body.name) return res.status(400).send({ message: "User name is not provided" })
    if (!req.body.userId) return res.status(400).send({ message: "User ID was not provided" })
    try {
        const user = await User.findOne({ userId: req.body.userId })
        if (user !== null) return res.status(400).send({ message: "User exists" })
    } catch (err) { return res.status(500).send({ message: "Internal Server Error" }) }
    if (!req.body.password) return res.status(400).send({ message: "Password was not provided" })
    if (!req.body.email) return res.status(400).send({ message: "Email was not provided" })
    if (!isValidEmail(req.body.email)) return res.status(400).send({ message: "Email is not valid" })
    if (!req.body.userType) return res.status(400).send({ message: "User type is not provided" })

    if (req.body.userType === Constants.userTypes.admin) return res.status(400).send({ message: "Admin registration is not allowed" })
    const userTypes = [Constants.userTypes.customer, Constants.userTypes.engineer]
    if (!userTypes.includes(req.body.userType)) return res.status(400).send({ message: "User type provided does not exist", "Available Types": userTypes })

    next()
}

const validateSignIn = async (req, res, next) => {

    if (!req.body.userId) return res.status(400).send({ message: "User ID was not provided" })
    try {
        const user = await User.findOne({ userId: req.body.userId })
        if (user === null) return res.status(400).send({ message: "User does not exist" })
    } catch (err) { return res.status(500).send({ message: "Internal Server Error" }) }
    if (!req.body.password) return res.status(400).send({ message: "Password was not provided" })

    next()
}

module.exports = {
    validateSignIn, validateSignUp
}


const User = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')

exports.findAll = async (req, res) => {
    const queryObj = {}
    const { userType, userStatus } = req.query
    if (userType) { queryObj.userType = userType }
    if (userStatus) { queryObj.userType = userStatus }
    try {
        const users = await User.find(queryObj)
        return res.status(200).json(objectConverter.userResponse(users))
    }
    catch (err) { console.log("Error in find all", err); return res.status(500).send({ message: "Internal server error" }) }
}

exports.findByUserId = async (req, res) => {
    try {
        const user = await User.find(({ userId: req.params.id }))
        return res.status(200).json(objectConverter.userResponse(user));
    }
    catch (err) { console.log("Error in findByUserId", err); return res.status(500).send({ message: "Internal server error" }) }
}
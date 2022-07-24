const User = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')

exports.findAll = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).send(objectConverter.userResponse(users))
    }
    catch (err) { console.log("Error in find all", err); return res.status(500).send({ message: "Internal server error" }) }

}
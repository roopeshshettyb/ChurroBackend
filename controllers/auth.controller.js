const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const constants = require('../utils/constants')

exports.signup = async (req, res) => {
    if (req.body.userType != constants.userTypes.customer) req.body.userStatus = constants.userStatus.pending; else req.body.userStatus = constants.userStatus.approved;
    const { name, userId, password, email, userType, userStatus } = req.body
    const user = { name, userId, password: bcrypt.hashSync(password, 8), email, userType, userStatus }
    try {
        const createdUser = await User.create(user)
        createdUser.password = ""
        return res.status(201).send(createdUser)
    } catch (err) { console.log(err); return res.status(500).send({ message: "Internal server error" }) }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId })
        if (user == null) return res.status(400).send({ message: "Failed User ID Does not Exist" });
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: "Wrong Password" });
        const token = jwt.sign({ id: user.userId }, authConfig.secret, { expiresIn: '7d' });
        user.password = ""
        return res.status(200).send({ user, token });
    } catch (err) { console.log("Error in sign in", err.message); return res.status(500).send({ message: "Internal server error" }) }
}
const User = require('../models/user.model')
const constants = require("../utils/constants")
const Ticket = require('../models/ticket.model')

const isAdminOrOwnerOrEngineerOfTicket = async (req, res, next) => {
    try {
        const callingUser = await User.findOne({ userId: req.userId })
        const ticketInfo = await Ticket.findOne({ _id: req.params.id })
        if (!ticketInfo) return res.status(401).send({ message: "No ticket found" })
        if (callingUser.userType === constants.userTypes.admin || callingUser.userId === ticketInfo.reporter || callingUser.userId === ticketInfo.assignee) {
            if (req.body.assignee != undefined && callingUser.userType != constants.userTypes.admin) return res.status(403).send({ message: "Unauthorized" });
            if (req.body.assignee) {
                const engineer = User.findOne({ userId: req.body.assignee })
                if (!engineer || engineer.userType !== constants.userTypes.engineer) return res.status(400).send({ message: "Assignee doesn't exist" });
            }
            next()
        }
        else return res.status(403).send({ message: "Unauthorized" })
    } catch (err) { console.log("Error in isAdminOrOwnerOrEngineerOfTicket", err); return res.status(500).send({ message: "Internal server error" }) }
}

const validateCreateTicketBody = async (req, res, next) => {
    if (!req.body.title) return res.status(400).send({ message: "Title is not provided" })
    if (!req.body.description) return res.status(400).send({ message: "Description was not provided" })
    next()
}

const validateUpdateTicketReq = async (req, res, next) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id })
        if (!ticket) return res.status(401).send({ message: "No ticket found" })
        next()
    } catch (err) { console.log("Error in validateUpdateTicketReq", err.message); return res.status(500).send({ message: "Internal server error" }) }
}

module.exports = {
    isAdminOrOwnerOrEngineerOfTicket, validateCreateTicketBody, validateUpdateTicketReq
}

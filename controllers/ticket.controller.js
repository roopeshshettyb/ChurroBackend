const Ticket = require('../models/ticket.model')
const User = require('../models/user.model')
const constants = require('../utils/constants')

exports.createTicket = async (req, res) => {
    const { title, ticketPriority, description, status } = req.body
    const reporter = req.userId
    const ticketObj = { title, ticketPriority, description, status, reporter }
    try {
        const engineer = await User.findOne({ userType: constants.userTypes.engineer, userStatus: constants.userStatus.approved })
        if (engineer !== null) ticketObj.assignee = engineer.userId;
        const createdTicket = await Ticket.create(ticketObj)
        if (createdTicket) {
            const customer = await User.findOne({ userId: req.userId })
            customer.createdTickets.push(createdTicket); await customer.save()
            engineer.assignedTickets.push(createdTicket); await engineer.save()
            return res.status(201).send(createdTicket)
        }
    } catch (err) { console.log("Error in createTicket", err.message); return res.status(500).send({ message: "Internal server error" }) }
}

exports.getTickets = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.userId })
        var createdIds = user.createdTickets
        var tickets = new Object()
        tickets.createdTickets = await Ticket.find({ "_id": { $in: createdIds } })
        if (user.userType === constants.userTypes.engineer) {
            var assignedIds = user.assignedTickets
            tickets.assignedTickets = await Ticket.find({ "_id": { $in: assignedIds } })
        }
        return res.status(200).json(tickets)
    } catch (err) { console.log("Error in getTickets", err.message); return res.status(500).send({ message: "Internal server error" }) }
}

exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id })
        ticket.title = req.body.title ? req.body.title : ticket.title
        ticket.ticketPriority = req.body.ticketPriority ? req.body.ticketPriority : ticket.ticketPriority
        ticket.description = req.body.description ? req.body.description : ticket.description
        ticket.status = req.body.status ? req.body.status : ticket.status
        ticket.assignee = req.body.assignee ? req.body.assignee : ticket.assignee
        const updatedTicket = await ticket.save()
        return res.status(200).json((updatedTicket));
    } catch (err) { console.log("Error in updateTicket", err.message); return res.status(500).send({ message: "Internal server error" }) }
}
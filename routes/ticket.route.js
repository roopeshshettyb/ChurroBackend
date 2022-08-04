const auth = require('../middlewares/auth.jwt')
const { createTicket, getTickets, updateTicket } = require("../controllers/ticket.controller")
const mw = require('../middlewares')

module.exports = (app) => {
    app.post('/crm/api/v1/ticket/create', auth.verifyToken, mw.ticket.validateCreateTicketBody, createTicket)
    app.get('/crm/api/v1/ticket', auth.verifyToken, getTickets)
    app.put('/crm/api/v1/ticket/:id', auth.verifyToken, mw.ticket.isAdminOrOwnerOrEngineerOfTicket, mw.ticket.validateUpdateTicketReq, updateTicket)
}
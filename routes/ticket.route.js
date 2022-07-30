const auth = require('../middlewares/auth.jwt')
const { createTicket, getTickets } = require("../controllers/ticket.controller")

module.exports = (app) => {
    app.post('/crm/api/v1/ticket/create', auth.verifyToken, createTicket)
    app.get('/crm/api/v1/ticket', auth.verifyToken, getTickets)
}
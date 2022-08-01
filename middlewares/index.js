const auth = require('./auth.middleware')
const authJwt = require('./auth.jwt')
const ticket = require('./ticket.middleware')

module.exports = {
    auth, authJwt, ticket
}
const auth = require('./auth.middleware')
const authJwt = require('./auth.jwt')

module.exports = {
    auth, authJwt
}
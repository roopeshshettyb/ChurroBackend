const { findAll } = require("../controllers/user.controller")
const auth = require('../middlewares/auth.jwt')

module.exports = (app) => {
    app.get('/crm/api/v1/user/findall', auth.verifyToken, auth.isAdmin, findAll)
}
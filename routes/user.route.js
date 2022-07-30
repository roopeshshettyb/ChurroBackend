const { findAll, findByUserId, update } = require("../controllers/user.controller")
const auth = require('../middlewares/auth.jwt')

module.exports = (app) => {
    app.get('/crm/api/v1/user/findall', auth.verifyToken, auth.isAdmin, findAll)
    app.get('/crm/api/v1/user/:id', auth.isValidUserIdInReqParam, auth.verifyToken, auth.isAdminOrOwner, findByUserId)
    app.put('/crm/api/v1/user/:id', auth.isValidUserIdInReqParam, auth.verifyToken, auth.isAdminOrOwner, update)

}
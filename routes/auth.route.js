const { signup, signin } = require("../controllers/auth.controller")
const { auth } = require('../middlewares')
module.exports = (app) => {
    app.post('/crm/api/v1/auth/signup', auth.validateSignUp, signup)
    app.post('/crm/api/v1/auth/signin', auth.validateSignIn, signin)
}
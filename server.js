const express = require('express')
const app = express()
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')
const User = require('./models/user.model')
const bcrypt = require('bcrypt')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(dbConfig.DATABASE)
const db = mongoose.connection
db.on('error', () => { console.log("Error while connecting to DB") })
db.once('open', () => { console.log("Connected to DB") })
async function init() {
    try {
        const user = await User.create({
            name: "Roop",
            userId: "admin",
            password: bcrypt.hashSync("roop", 8),
            email: "rrrrh@gmail.com",
            userType: "ADMIN",
            userStatus: "APPROVED"
        });
        // console.log(user)
        // await User.deleteMany()
    } catch (err) { console.log(err) }
}
// init()

require('./routes/auth.route')(app)
require('./routes/user.route')(app)
require('./routes/ticket.route')(app)

app.listen(serverConfig.PORT, () => {
    console.log('Server is flying on PORT', serverConfig.PORT)
})


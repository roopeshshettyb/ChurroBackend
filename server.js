const express = require('express')
const app = express()
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(dbConfig.DATABASE)
const db = mongoose.connection
db.on('error', () => { console.log("Error while connecting to DB") })
db.once('open', () => { console.log("Connected to DB") })

require('./routes/auth.route')(app)
require('./routes/user.route')(app)

app.listen(serverConfig.PORT, () => {
    console.log('Server is flying on PORT', serverConfig.PORT)
})


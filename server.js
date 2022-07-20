const express = require('express')
const app = express()
const serverConfig = require('./configs/server.config')

app.listen(serverConfig.PORT, () => {
    console.log('Server is flying on PORT', serverConfig.PORT)
})
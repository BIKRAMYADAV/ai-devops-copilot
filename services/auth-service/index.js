const express = require('express')
require('dotenv').config()
const ConnectDB = require('./configs/db')
const PORT = process.env.PORT
const app = express()

app.use(express.json())

ConnectDB();

app.listen(PORT, () => {
    console.log(`the auth service is live on port ${PORT}`)
})
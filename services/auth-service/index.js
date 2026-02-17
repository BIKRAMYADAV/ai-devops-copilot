const express = require('express')
require('dotenv').config()
const {ConnectDB}= require('./configs/db')
const authRoutes = require('./routes/authRoutes')
const PORT = process.env.PORT
const app = express()
const crypto = require('crypto')

app.use(express.json())

ConnectDB();

app.use((req, res, next) => {
    req.headers['x-request-id'] = crypto.randomUUID;
    next();
})

app.use('/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`the auth service is live on port ${PORT}`)
})
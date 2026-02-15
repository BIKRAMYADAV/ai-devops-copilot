const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT
const app = express()

app.listen(PORT, () => {
    console.log(`the auth service is live on port ${PORT}`)
})
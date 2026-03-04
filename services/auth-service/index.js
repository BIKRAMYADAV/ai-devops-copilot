const express = require('express')
require('dotenv').config()
const {ConnectDB}= require('./configs/db')
const authRoutes = require('./routes/authRoutes')
const analyzeRoute = require('./routes/analyze')
const PORT = process.env.PORT
const app = express()
const crypto = require('crypto')
const {register} = require('./utils/metrics')
const cors = require('cors')

app.use(express.json())
app.use(cors())
ConnectDB();

app.use((req, res, next) => {
    req.headers['x-request-id'] = crypto.randomUUID;
    next();
})

app.get('/metrics', async (req, res) => {
    res.set('Content-Type',register.contentType )
    res.end(await register.metrics());
})

app.use('/auth',authRoutes);
app.use('/api', analyzeRoute);



app.listen(PORT, () => {
    console.log(`the auth service is live on port ${PORT}`)
})

//metrics : error, latency and traffic

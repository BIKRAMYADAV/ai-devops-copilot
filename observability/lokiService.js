const axios = require('axios')
const LOKI_URL = "http://localhost:3100"
 async function getLogs(service){
    try {
        const response = await axios.get(LOKI_URL+"/loki/api/v1/query_range", {
            params: {
                query: `{container="${service}"}`,
                limit:50 
            }
        })
        const streams = response.data.data.result 
        return streams
    } catch(error){
        console.log('There was an error in fetching loki logs', error)
        res.status(500).json({
            message: 'Threre was a loki error',
            error
        })
    }
 }

 module.exports = {getLogs}
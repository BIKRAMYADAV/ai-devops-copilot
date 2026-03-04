const axios = require('axios')

exports.analyzeController = async (req, res) => {
    try {
        const {service_name, time_range} = req.body 
        const response = await axios.post("", {
            service_name,
            environment : "production",
            time_range,
            logs,
            metrics
        })
        if(!response){
            // console.log(response.error)
            return res.status(400).json({
                message: 'there was a user error while generating ai response'
            })
        }
        return res.status(200).json({
            message: 'successfully generated ai response',
            response
        })
    } catch (error){
        console.log('There was an error while analyzing the service')
        return res.status(500).json({
            message: 'There was an error while analyzing the service'
        })
    }
}

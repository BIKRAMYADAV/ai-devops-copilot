const axios = require('axios')

exports.analyzeController = async (req, res) => {
    try {
        const {service_name, time_range} = req.body 

        //dummy
            const logs = `
ERROR: Database connection timeout
WARN: Retry failed
Exception: TimeoutError
`;

    const metrics = {
      cpu_usage: 91,
      memory_usage: 82,
      error_rate: 12.3,
      request_latency_ms: 610
    };


        const response = await axios.post("http://localhost:8000/api/v1/analyze", {
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
            analysis: response.data
        })
    } catch (error){
        console.log('There was an error while analyzing the service', error)
        return res.status(500).json({
            message: 'There was an error while analyzing the service'
        })
    }
}

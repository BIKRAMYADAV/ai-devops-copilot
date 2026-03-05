const PROM_URL = "http://localhost:9090"
const axios = require('axios')

const getMetrics = async (service) => {
    try{
        const cpu = await axios.get(`${PROM_URL}/api/v1/query`, {
            params:{
                 query: `rate(container_cpu_usage_seconds_total{name="${serviceName}"}[5m])`
            }
        });
          const memory = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
      params: {
        query: `container_memory_usage_bytes{name="${serviceName}"}`
      }
    });
     const cpuUsage = cpu.data.data.result[0]?.value[1] || 0;
    const memoryUsage = memory.data.data.result[0]?.value[1] || 0;
    return {
        cpuUsage: parseFloat(cpuUsage)*100,
        memory_usage: parseFloat(memoryUsage),
        error_rate:0,
        request_latency:0
    }

    } catch (error){
        console.log(`There was n error in ${service}`, error);
        res.status(500).json({
            message: `There was an error in service`,
            error
        })
    }
}

module.exports = {getMetrics}
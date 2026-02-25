const client = require('prom-client')

const register = new client.Registry()
client.collectDefaultMetrics({register})

const loginAttempts = new client.Counter({
    name: 'auth_login_attempts_total',
    help: 'Total login attempts'
})

const loginFailures = new client.Counter({
    name: 'auth_login_failures_total',
    help: 'Total login failures'
})

const requestDuration = new client.Histogram({
    name: 'auth_request_duration_seconds',
    help: 'request duration in seconds',
    buckets: [0.1, 0.5, 1, 2, 5]
})

register.registerMetric(loginAttempts)
register.registerMetric(loginFailures)
register.registerMetric(requestDuration)

module.exports = {
    register,
    loginAttempts,
    loginFailures,
    requestDuration
}

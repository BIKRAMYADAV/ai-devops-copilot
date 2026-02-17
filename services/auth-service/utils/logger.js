const pino = require('pino');

const logger = pino({
  level: 'info',
  base: {
    service: 'auth-service',
    environment: 'dev'
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

module.exports = logger;

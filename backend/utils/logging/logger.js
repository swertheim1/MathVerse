const winston = require('winston');

// Define log levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

// Create logger instance
const logger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      level: 'debug' // Log all levels for development
    }),
    // File transport for production
    new winston.transports.File({
      filename: 'error.log',
      level: 'error' // Log only errors in production
    })
  ]
});

// Usage examples
// logger.error('This is an error message.');
// logger.warn('This is a warning message.');
// logger.info('This is an info message.');
// logger.debug('This is a debug message.');

module.exports = logger;
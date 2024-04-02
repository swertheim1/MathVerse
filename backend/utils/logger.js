const winston= require('winston');
const { combine, timestamp, prettyPrint, json } = winston.format;

// const customFormat = format.combine(format.timestamp(), format.printf((info) => {
//     return `[${info.timestamp}] - [${info.level.toUpperCase().padEnd(8)}] - ${info.message}`
// }) )


const logger = winston.createLogger({
    
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console({ level: 'silly' }),
        // new winston.transports.File({ filename: 'app.log', level: 'info' }),
    ]
});

module.exports = logger;
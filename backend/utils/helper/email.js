const nodemailer = require('nodemailer');
const logger = require('../logging/logger');

const sendEmail = async (options) => {

    // create a transporter service to send the email
    const transport = nodemailer.createTransport({ 
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    
        // Log the configured options
        console.log('Transport options:', {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: "********660a", // Don't log the password
            }
        });

    // define email options
    const emailOptions = {
        from: "MathVerse Support<TechnicalSupport@mathverse.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

};
module.exports = sendEmail;
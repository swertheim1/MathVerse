const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Log SMTP configuration details
    console.log('SMTP Configuration:');
    console.log('EMAIL_Host:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

    // create a transporter service to send the email
    const transporter = nodemailer.createTransport({ 
        service: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD,
        }
    })

    // define email options
    const emailOptions = {
        from: "MathVerse Support<support@mathverse.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

};
module.exports = sendEmail;
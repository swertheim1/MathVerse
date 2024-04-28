const pool = require("../pool");
const jwt = require('jsonwebtoken')
const logger = require("../utils/logging/logger");

const getEmailFromToken = async (email) => {
    try {
        // Decode the token to extract the email
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        logger.debug('The decoded token is: ', decodedToken)
        return decodedToken.email;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

module.exports = { getEmailFromToken };
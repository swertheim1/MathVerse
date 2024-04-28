const pool = require('../pool');
const logger = require("../utils/logging/logger");


// express-validator used for validating and sanitizing input data
const { body, validationResult } = require('express-validator');
// const { firstName, lastName, email, password, age, gradeLevel, role, status } = req.body;

const resultsController = {};

resultsController.saveResults = async (req, res, next) => {
    logger.debug("info", 'Received POST request to save Results to Database');
    // logger.debug('Request body:',  req.body)

    try {

    } catch (error) {
        logger.error('Error saving results:', error);
        res.status(500).json({ message: 'Error saving results' });
    }
};
module.exports = resultsController;
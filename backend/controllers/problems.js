const pool = require('../pool');
const logger = require("../utils/logging/logger");

// express-validator used for validating and sanitizing input data
const { body, validationResult } = require('express-validator');
const problemController = {}


problemController.saveResults = async (req, res, next) => {
    logger.debug("info", 'Received GET request to get list of topics');
    // logger.debug('Request body:',  req.body)

    try {
        // get list of topics from database based on student grade level
        

    } catch {

    }
};
module.exports = problemController;
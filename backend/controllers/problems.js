const pool = require('../pool');


// express-validator used for validating and sanitizing input data
const { body, validationResult } = require('express-validator');
const problemController = {}
const logger = require('../utils/logging/logger');

// problemController.getTopics = async (req, res, next) => {
//     logger.debug("debug", 'Received GET request to get list of topics');
//     logger.debug('Request body:',  req.body)

//     try {
//         // get list of topics from database based on student grade level
        

//     } catch {

//     }
// }

// problemController.getNumberSets = async (req, res, next) => {
//     logger.debug("debug", 'Received GET request to get list of topics');
//     logger.debug('Request body:',  req.body)

//     try {
//         // get list of numberSets topics from database based on student grade level
        

//     } catch {

//     }
// }

problemController.saveResults = async (req, res, next) => {
    logger.debug("debug", 'Received GET request to get list of topics');
    logger.debug('Request body:',  req.body)

    try {
        // get list of topics from database based on student grade level
        

    } catch {

    }
}


module.exports = problemController;
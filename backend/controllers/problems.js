const pool = require('../pool');

// express-validator used for validating and sanitizing input data
const { body, validationResult } = require('express-validator');
const problemController = {}
const logger = require('./utils/logger');

problemController.topics = async (req, res, next) => {
    console.log('Received GET request to get list of topics');
    console.log('Request body:',  req.body)

    try {
        // get list of topics from database based on student grade level
        

    } catch {

    }
}


module.exports = problemController;
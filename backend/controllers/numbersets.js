const pool = require('../pool');
const logger = require('../utils/logging/logger');
const { validationResult } = require('express-validator');
const numberSetsController = {}

const fetchNumberSets = require("../services/numbersetService")


exports.updateTopics = async (req, res, next) => {
    // Implement updateTopics logic here
};

// Function to get a list of numberSets based on student grade level
// query the database for applicable math numberSets based on grade_level 
// of user and then redirect to the numberSets page

exports.getNumberSets = async (req, res, next) => {
    const grade_level = req.query.grade_level; 

    try {
        const numberSets = await fetchNumberSets(grade_level);
        logger.info(numberSets);
        res.json(numberSets); // Send the list of numberSets back to the client as JSON

    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};



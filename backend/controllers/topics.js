const pool = require('../pool');
const logger = require('../utils/logging/logger');
const { validationResult } = require('express-validator');
const topicsController = {}

const fetchTopics = require("../services/topicService");
const { log } = require('winston');


exports.updateTopics = async (req, res, next) => {
    // Implement updateTopics logic here
};

// Function to get a list of topics based on student grade level
// query the database for applicable math topics based on grade_level 
// of user and then redirect to the topics page

exports.getTopics = async (req, res, next) => {
    const grade_level = req.query.grade_level; 

    try {
        const topics = await fetchTopics(grade_level);
        logger.info(topics);
        res.json(topics); // Send the list of topics back to the client as JSON

    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};



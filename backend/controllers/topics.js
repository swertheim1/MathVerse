const pool = require('../pool');
// const { log } = require('winston');
const logger = require('../utils/logging/logger');
const { validationResult } = require('express-validator');
const topicsController = {}


exports.updateTopics = async (req, res, next) => {
    // Implement updateTopics logic here
};

// Function to get a list of topics based on student grade level
topicsController.getTopicsByGradeLevel = async (req, res, next) => {
    logger.info("calling getTopicsByGradeLevel");
    console.log("calling getTopicsByGradeLevel")
    try {
        
        const grade_level = req.query.grade_level;

        logger.info(grade_level)

        // Fetch topics based on grade_level from the database
        // Implement your logic here
        // query the database 
        const topics = await pool.query("SELECT * FROM topics WHERE grade_level = ?", [grade_level]);
        const rows = topics[0]; // Assuming MySQL returns an array where the first element contains the result
        // const parsedTopics = JSON.parse(topics)
        

        // Check if any rows are returned
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No topics found for the given grade level' });
        }

        // Extracting relevant data from the rows
        const topicsData = rows.map(row => ({
            topic_id: row.topic_id,
            topic_name: row.topic_name,
            grade_level: row.grade_level
        }));

        console.log('topicsData', topicsData)

res.json({ topics: topicsData });
    } catch (error) {
        // Handle errors
        logger.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = topicsController

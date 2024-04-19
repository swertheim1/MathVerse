const pool = require('../pool');
const logger = require('../utils/logging/logger');
const fetchTopics = require("../services/topicService");
const { log } = require('winston');

exports.getTopicsByGrade = async (req, res) => {
    try {
        const grade_level = req.params.grade_level;
        const topics = await fetchTopics(grade_level);

        if (!topics || topics.length === 0) {
            logger.warn('No topics found for the specified grade level');
            return res.status(404).json({ error: 'No topics found for the specified grade level' });
        }

        logger.info('Returning topics');
        res.json(topics);
    } catch (error) {
        logger.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateTopics = async (req, res, next) => {
    // Implement updateTopics logic here
};

// Function to get a list of topics based on student grade level
// query the database for applicable math topics based on grade_level 
// of user and then redirect to the topics page

// exports.getTopics = async (req, res, next) => {
//     logger.info("Get topics called")
//     const grade_level = req.query.grade_level;

//     try {
//         const topics = await fetchTopics(grade_level);
//         logger.info(`Get Topics from User Login Grade Level: ${topics}`);
//         res.json(topics); // Send the list of topics back to the client as JSON

//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Handle errors
//     }
// };

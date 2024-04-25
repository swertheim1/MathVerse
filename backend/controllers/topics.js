const pool = require('../pool');
const logger = require('../utils/logging/logger');
const fetchTopics = require("../services/topic");

exports.getTopicsByGrade = async (req, res) => {
    logger.info('Received GET request for topics');
   
    try {
        const grade_level = req.params.grade_level;
        const topics = await fetchTopics(grade_level);

        if (!grade_level) {
            logger.warn('Grade level parameter is missing');
            return res.status(400).json({ error: 'Grade level parameter is required' });
        }

        if (!topics || topics.length === 0) {
            logger.warn('No topics found for the specified grade level');
            return res.status(404).json({ error: 'No topics found for the specified grade level' });
        }

        logger.info('Topics fetched successfully:', topics);
        res.json(topics);

    } catch (error) {
        logger.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateTopics = async (req, res, next) => {
    // Implement updateTopics logic here
};

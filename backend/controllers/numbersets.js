const pool = require('../pool');
const logger = require('../utils/logging/logger');
const fetchNumberSets = require("../services/numberset")

exports.getNumberSetsByGrade = async (req, res, next) => {
    logger.info('Received GET request for numberSets');
   
    try {
        const grade_level = req.query.grade_level; // Access grade_level from request body
        

        if (!grade_level) {
            logger.warn('Grade level parameter is missing');
            return res.status(400).json({ error: 'Grade level parameter is required' });
        }
        const numbersets = await fetchNumberSets(grade_level);

        if (!numbersets || numbersets.length === 0) {
            logger.warn('No numbersets found for the specified grade level');
            return res.status(404).json({ error: 'No numbersets found for the specified grade level' });
        }
        // Proceed with fetching number sets using the grade_level parameter
        const numberSets = await fetchNumberSets(grade_level);
        logger.info('Numbersets fetched successfully:', numberSets);
        res.json(numberSets); // Send the list of numberSets back to the client as JSON

    } catch (error) {
        logger.error('Error fetching numbersets:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
};

exports.updateNumberSets = async (req, res, next) => {
    // Implement updateNumberSets logic here
};
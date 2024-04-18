const pool = require('../pool');
const logger = require('../utils/logging/logger');
const numberSetsController = {}
const fetchNumberSets = require("../services/numbersetService")

numberSetsController.getNumberSets = async (req, res, next) => {
    logger.info('Received GET request for numberSets');
   
    try {
        const grade_level = req.body.grade_level; // Access grade_level from request body

        if (!grade_level) {
            logger.warn('Grade level parameter is missing');
            return res.status(400).json({ error: 'Grade level parameter is supposed to be there' });
        }

        // Proceed with fetching number sets using the grade_level parameter
        const numberSets = await fetchNumberSets(grade_level);
        logger.info('Number sets fetched successfully:', numberSets);
        res.json(numberSets); // Send the list of numberSets back to the client as JSON

    } catch (error) {
        logger.error('Error fetching number sets:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
};
module.exports = numberSetsController;


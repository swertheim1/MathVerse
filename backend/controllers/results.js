const pool = require('../pool');
const logger = require("../utils/logging/logger");

resultsController = {}

resultsController.saveResults = async (req, res, next) => {

    logger.debug('Received POST request to save Results to Database');
    const { topic: topic_name, numberset: numberset_name, totalQuestions, totalCorrect, user_id, grade_level } = req.body;

    try {
        // Retrieve topic_id
        const topicResult = await pool.query('SELECT * FROM topics WHERE topic_name = ? AND grade_level = ?', [topic_name, grade_level]);
        const fetchedTopic = JSON.stringify(topicResult[0]);

        // Parse the stringified JSON into a JavaScript object
        const topics = JSON.parse(fetchedTopic);

        // Check if topics is an array and not empty
        if (Array.isArray(topics) && topics.length > 0) {
            // Access the first element of the array and get the topic_id
            topic_id = topics[0].topic_id;
            logger.debug(`topic_id: ${topic_id}`);
        } else {
            logger.info('No topics found');
        }

        // Retrieve numberset_id
        const numbersetResult = await pool.query("SELECT numberset_id FROM numbersets WHERE LOWER(numberset_name) = LOWER(?) AND LOWER(grade_level) = LOWER(?)", [numberset_name, grade_level]);
        const fetchedNumberset = JSON.stringify(numbersetResult[0]);

        // Parse the stringified JSON into a JavaScript object
        const numberset = JSON.parse(fetchedNumberset);

        // Check if topics is an array and not empty
        if (Array.isArray(numberset) && numberset.length > 0) {
            // Access the first element of the array and get the topic_id
            numberset_id = numberset[0].numberset_id;
            logger.debug(`numberset_id: ${numberset_id}`);
        } else {
            logger.info('No topics found');
        }

        
        // Insert into results table
        logger.info(`inserting data into table: topic_id ${topic_id}, numberset_id ${numberset_id}, user_id ${user_id}`)
        const query = "INSERT INTO results (number_of_questions, number_correct, topic_id, numberset_id, user_id) VALUES (?, ?, ?, ?, ?)";
        await pool.query(query, [totalQuestions, totalCorrect, topic_id, numberset_id, user_id]);

        // Respond with success message
        return res.status(201).json({ message: "Results Saved to Database" });
    }
    catch (error) {
        logger.error('Error saving results:', error);
        return res.status(500).json({ message: 'Error saving results' });
    }
}
module.exports = resultsController;
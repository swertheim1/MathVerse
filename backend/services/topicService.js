const logger = require("../winston");
const pool = require("../pool");


async function fetchTopics(grade_level) {
    console.log('FetchingTopics function in topicsService called');
    try {
        // Validate input parameters
        if (!grade_level) {
            logger.debug(`Grade level parameter: ${grade_level}`);
            throw new Error('Grade level parameter is required');
        }

        // Fetch topics based on grade_level from the database
        const topics = await pool.query("SELECT * FROM topics WHERE grade_level = ?", [grade_level]);
        logger.info(`Fetched topics: ${JSON.stringify(topics[0])}`);
        const rows = topics[0];        

        // Check if any rows are returned
        if (rows.length === 0) {
            throw new Error('No topics found for the given grade level');
        }

        // Extract relevant data from the rows
        const topicsData = rows.map(row => ({
            topic_name: row.topic_name,
        }));

        // Log each topic name for debugging
        // topicsData.forEach(topic => {
        //     logger.debug(`Topic: ${topic.topic_name}`);
        // });
        // return topicsData;

    } catch (error) {
        // Log the error
        logger.error('Error fetching topics:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

module.exports = fetchTopics;


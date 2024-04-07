const logger = require("../winston");
const pool = require("../pool");


async function fetchTopics(grade_level) {
    // Log the grade level
    logger.info*('fetchTopics');
    logger.info(grade_level);

    // Validate input parameters
    if (!grade_level) {
        throw new Error('Grade level parameter is required');
    }

    // Fetch topics based on grade_level from the database
    const topics = await pool.query("SELECT * FROM topics WHERE grade_level = ?", [grade_level]);
    const rows = topics[0]; // Assuming MySQL returns an array where the first element contains the result       

    // Check if any rows are returned
    if (rows.length === 0) {
        throw new Error('No topics found for the given grade level');
    }

    // Extract relevant data from the rows
    const topicsData = rows.map(row => ({
        topic_name: row.topic_name,
    }));

    // Log each topic name
    topicsData.forEach(topic => {
        logger.info(topic.topic_name);
    });

    console.log('topicsData', topicsData);
    return topicsData;
}

module.exports = fetchTopics;

const logger = require("../winston");
const pool = require("../pool");


async function fetchNumberSets(grade_level) {
    // Log the grade level
    logger.info*('fetchNumberSets');
    logger.info(grade_level);

    // Validate input parameters
    if (!grade_level) {
        throw new Error('Grade level parameter is required');
    }

    // Fetch numbersets based on grade_level from the database
    const numberSets = await pool.query("SELECT * FROM numbersets WHERE grade_level = ?", [grade_level]);
    const rows = numberSets[0]; // Assuming MySQL returns an array where the first element contains the result       

    // Check if any rows are returned
    if (rows.length === 0) {
        throw new Error('No numberSets found for the given grade level');
    }
    logger.log(numberSets)
    // Extract relevant data from the rows
    const numberSetsData = rows.map(row => ({
        numberset_name: row.numberset_name,
    }));

    // Log each numberset name
    numberSetsData.forEach(numberSet => {
        logger.info(numberSet.numberset_name);
    });

    console.log('topicsData', numberSetsData);
    return numberSetsData;
}

module.exports = fetchNumberSets;

const logger = require("../utils/logging/logger");
const pool = require("../pool");


async function fetchNumberSets(grade_level) {
    logger.info('FetchingNumberSets function in numberSetService called');
    logger.debug(grade_level);

    // Validate input parameters
    if (!grade_level) {
        logger.warn("Grade level parameter is missing")
        // throw new Error('Grade level parameter is required');
    }

    // Fetch numbersets based on grade_level from the database
    const numberSets = await pool.query("SELECT * FROM numbersets WHERE grade_level = ?", [grade_level]);
    const rows = numberSets[0];      

    // Check if any rows are returned
    if (rows.length === 0) {
        throw new Error('No numberSets found for the given grade level');
    }
    logger.log('numberSets', numberSets);

    // Extract relevant data from the rows
    const numberSetsData = rows.map(row => ({
        numberset_name: row.numberset_name,
    }));

    // Log each numberset name
    numberSetsData.forEach(numberSet => {
        logger.info(numberSet.numberset_name);
    });

    console.log('numberSetsData', numberSetsData);
    return numberSetsData;
}

module.exports = fetchNumberSets;

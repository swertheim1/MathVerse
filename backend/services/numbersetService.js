const logger = require("../utils/logging/logger");
const pool = require("../pool");


async function fetchNumberSets(grade_level) {
    logger.info('FetchingNumberSets function in numberSetService called');
    logger.info(grade_level);

    // Validate input parameters
    if (!grade_level) {
        logger.warn("Grade level parameter is missing")
        // throw new Error('Grade level parameter is required');
    }

    // Fetch numbersets based on grade_level from the database
    const numberSets = await pool.query("SELECT * FROM numbersets WHERE grade_level = ?", [grade_level]);
    logger.info(`Fetched numbersets: ${JSON.stringify(numberSets[0])}`);
    const rows = numberSets[0];      
    logger.debug('Fetch numbersets based on grade_level from the database', rows)


    // Check if any rows are returned
    if (rows.length === 0) {
        throw new Error('No numberSets found for the given grade level');
    }
    logger.info('numberSets:', numberSets[0]);

    // Extract relevant data from the rows
    const numberSetsData = rows.map(row => ({
        numberset_name: row.numberset_name,
    }));

    // Log each numberset name
    numberSetsData.forEach(numberSet => {
        logger.info(numberSet.numberset_name);
    });

    logger.info('numberSetsData', numberSetsData);
    return numberSetsData;
}

module.exports = fetchNumberSets;

const logger = require("../utils/logging/logger");
const fetchTopics = require("./topic");
const fetchNumberSets = require("./numberset");

class DataFetchingService {
    static async fetchUserData(gradeLevel) {
        const topics = await fetchTopics(gradeLevel) || [];
        const numberSets = await fetchNumberSets(gradeLevel) || [];
        logger.debug(JSON.stringify(topics))
        logger.debug(JSON.stringify(numberSets))
        return { topics, numberSets };
    }
}

module.exports = DataFetchingService;

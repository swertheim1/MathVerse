const logger = require('../utils/logging/logger');
const body = require('express-validator');

const topicsController = {}

topicsController.getTopics = async (req, res, next) => {
    const grade_level_query = await pool.query('SELECT topic_name FROM topics WHERE grade_level =?', [grade_level])
}
    // get a list of topics based on student grade
    // query database




export default topicsController
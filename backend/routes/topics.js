const express = require('express');
const logger = require('../utils/logging/logger')
const topicsController = require('../controllers/topics'); 
require('dotenv').config();


// create a route instance
const topicsRouter = express.Router();



// endpoint to get topics by grade level
topicsRouter.route('/topics').get(topicsController.getTopicsByGrade);

// endpoint to get all topics - NOT IMPLEMENTED YET
// topicsRouter.route('/').get(topicsController.getTopics);
topicsRouter.route('/updateTopics').post(topicsController.updateTopics);

module.exports = topicsRouter;
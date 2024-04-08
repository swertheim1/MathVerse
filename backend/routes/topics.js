const express = require('express');
const logger = require('../utils/logging/logger')
const topicsController = require('../controllers/topics'); 
require('dotenv').config();


// create a route instance
const topicsRouter = express.Router();

topicsRouter.route('/updateTopics').post(topicsController.updateTopics);

// endpoint to get all topics
topicsRouter.route('/').get(topicsController.getTopics);

// endpoint to get topics by grade level
// topicsRouter.route('/:grade_level').get(topicsController.getTopicsByGrade);


module.exports = topicsRouter;
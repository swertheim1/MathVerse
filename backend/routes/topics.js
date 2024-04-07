const express = require('express');
const topicsController = require('../controllers/topics'); 
require('dotenv').config();

// create a route instance
const topicsRouter = express.Router();

// topicsRouter.route('/updateTopics').post(topicsController.updateTopics);
topicsRouter.route('/').get(topicsController.getTopics);

module.exports = topicsRouter;
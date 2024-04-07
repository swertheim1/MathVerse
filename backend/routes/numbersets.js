const express = require('express');
const numberSetsController = require('../controllers/numbersets'); 
require('dotenv').config();

// create a route instance
const numberSetsRouter = express.Router();

// topicsRouter.route('/updateTopics').post(topicsController.updateTopics);
numberSetsRouter.route('/').get(numberSetsController.getNumberSets);

module.exports = numberSetsRouter;
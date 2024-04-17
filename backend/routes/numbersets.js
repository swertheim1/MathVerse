const express = require('express');
const numberSetsController = require('../controllers/numbersets'); 
const logger = require('../utils/logging/logger')

const numberSetsRouter = express.Router();

// numberSetsRouter.route('/').get(numberSetsController.getNumberSets);

module.exports = numberSetsRouter;
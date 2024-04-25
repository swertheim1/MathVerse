const express = require('express');
const numberSetsController = require('../controllers/numbersets'); 
const logger = require('../utils/logging/logger')

const numberSetsRouter = express.Router();

numberSetsRouter.route('/numbersets').get(numberSetsController.getNumberSetsByGrade);

module.exports = numberSetsRouter;
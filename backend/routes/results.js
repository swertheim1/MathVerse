const express = require('express');
const logger = require("../utils/logging/logger");
const resultsController = require('../controllers/results'); 

const resultsRouter = express.Router();

resultsRouter.route('/saveResults').post(resultsController.saveResults);

module.exports = resultsRouter;
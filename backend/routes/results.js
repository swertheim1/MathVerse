const express = require('express');
const logger = require("../utils/logging/logger");
const resultsController = require('../controllers/results'); 

const resultsRouter = express.Router();

resultsRouter.route('/saveResults').post(resultsController.saveResults);
resultsRouter.route('/getResults').get(resultsController.getResults);
module.exports = resultsRouter;
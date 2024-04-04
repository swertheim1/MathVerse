const express = require('express');
const problemController = require('../controllers/problems'); // Importing the object, not just the module
require('dotenv').config();

const problemRouter = express.Router();

problemRouter.route('/getTopics').post(problemController.getTopics);
problemRouter.route('/getNumberSets').post(problemController.getNumberSets);
problemRouter.route('/saveResults').post(problemController.saveResults);

module.exports = problemRouter;
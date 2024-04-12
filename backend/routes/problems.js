const express = require('express');
const problemController = require('../controllers/problems'); 

const problemRouter = express.Router();

problemRouter.route('/saveResults').post(problemController.saveResults);

module.exports = problemRouter;
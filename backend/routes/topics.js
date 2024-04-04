const express = require('express');
const problemController = require('../controllers/problems'); // Importing the object, not just the module
require('dotenv').config();


const topicsRouter = express.Router();

topicsRouter.route('/Topics').post(problemController.Topics);




module.exports = topicsRouter
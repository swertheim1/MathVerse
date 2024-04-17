const express = require('express');
const homeController = require('../controllers/home'); 
require('dotenv').config();

// Create an instance of the Express Router
const homeRouter = express.Router();

homeRouter.route('/home').get(homeController.home);


// Export the router to make it available to other parts of the application
module.exports = homeRouter;

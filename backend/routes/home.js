const express = require('express');
const homeController = require('../controllers/home');
const logger = require('../utils/logging/logger'); // Import logger module

// Create an instance of the Express Router
const homeRouter = express.Router();

// Define the route handler for the home page
homeRouter.get('/home', homeController.getHomePage);


// Export the router to make it available to other parts of the application
module.exports = homeRouter;

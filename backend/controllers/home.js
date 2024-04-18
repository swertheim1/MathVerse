const pool = require("../pool");
const path = require('path');
const jwt = require("jsonwebtoken")
const logger = require('../utils/logging/logger');
const homeController = {};

homeController.getHomePage = async (req, res, next) => {
    try {
        logger.info("Home Controller");
        // Your logic for rendering the home page goes here
        res.sendFile(path.join(__dirname, '../frontend/src/'));
        // res.send("Welcome to the home page");

    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports = homeController;
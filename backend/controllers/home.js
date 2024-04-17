const pool = require("../pool");
const jwt = require("jsonwebtoken")
const homeController = {};

homeController.home = async (req, res, next) => {
    try {
        logger.info("Home Controller");
        // Your logic for rendering the home page goes here
        res.send("Welcome to the home page");
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports = homeController;
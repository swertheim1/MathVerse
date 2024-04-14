// This code sets up an Express application with CORS support, middleware for parsing incoming request bodies, 
// and imports the database connection from connection.js to be used within the application.

// Import the 'express' web application framework for Node.js
const express = require('express');
const morgan = require('morgan');

// Import the 'cors' middleware, to enable Cross-Origin Resource Sharing (CORS) in Express
var cors = require('cors');

const verifyToken = require('./backend/middleware/verify-token')
const bodyParser = require('body-parser');
const logger = require('./backend/utils/logging/logger');
const userController = require('./backend/controllers/users');
const topicsController = require('./backend/controllers/topics');
const numberSetsController = require('./backend/controllers/numbersets');
// Import the MySQL database connection exported from the 'connection.js' file
const pool = require('./backend/pool')

// Create an instance of the Express application
const app = express();
app.use(morgan('dev'));

// Use the 'cors' middleware to enable CORS in the Express app
app.use(cors({
    exposedHeaders: ['Authorization']
}));

// Parse incoming request bodies in middleware using 'express.urlencoded' middleware
// This middleware parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// Parse incoming request bodies in middleware using 'express.json' middleware
// This middleware parses incoming requests with JSON payloads
app.use(express.json());

// Log incoming requests before they reach the router
app.use((req, res, next) => {
    logger.debug(`Incoming request before it reaches the router: ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware or route handler
});

const userRouter = require('./backend/routes/users');
const problemRouter = require('./backend/routes/problems');
const topicsRouter = require('./backend/routes/topics');
const numberSetsRouter = require('./backend/routes/numbersets');
// const numberSetsRouter = require('./routes/numbersets');

app.use((req, res, next) => {
    logger.debug(`incoming requests after it reaches the router`);
    next();
    });


// routes using controller functions
app.get('/topics/:grade_level', topicsController.getTopicsByGrade);
app.get('/numberSets', numberSetsController.getNumberSets)    

app.use('/', userRouter);
app.use('/', topicsRouter);
app.use('/', problemRouter);
app.use('/', numberSetsRouter);

// Define error handling middleware
app.use((err, req, res, next) => {
    logger.debug(err.stack); // Log the error stack trace
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    next(err);
});

// Error handling for route not found
app.use((err, req, res, next) => {
    logger.debug('Error occurred:', err);
    res.status(404).json({ error: 'Route not found' });
});


// Middleware for the changePassword handler
app.post('/changePassword', verifyToken, userController.changePassword);

// Export the Express application to be used in other parts of your Node.js application
module.exports = app;


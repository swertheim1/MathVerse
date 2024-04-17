// This code sets up an Express application with CORS support, middleware for parsing incoming request bodies, 
// and imports the database connection from connection.js to be used within the application.

// Import the 'express' web application framework for Node.js
const express = require('express');
const morgan = require('morgan');

// Import the 'cors' middleware, to enable Cross-Origin Resource Sharing (CORS) in Express
var cors = require('cors');

const verifyToken = require('./middleware/verify-token')
const bodyParser = require('body-parser');
const logger = require('./utils/logging/logger');
const userController = require('./controllers/users');
const topicsController = require('./controllers/topics');
const numberSetsController = require('./controllers/numbersets');
// Import the MySQL database connection exported from the 'connection.js' file
const pool = require('./pool')

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

const userRouter = require('./routes/users');
const problemRouter = require('./routes/problems');
const topicsRouter = require('./routes/topics');
const numberSetsRouter = require('./routes/numbersets');
const homeRoute = require('./routes/home');
// const numberSetsRouter = require('./routes/numbersets');

app.use((req, res, next) => {
 // Log request method, URL, and timestamp
 console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
 // Log request headers
 console.log('Headers:', req.headers);

 // Log request query parameters
 console.log('Query Params:', req.query);

 // Log request body (if present and not too large)
 if (req.body) {
     console.log('Body:', req.body);
 }

 next(); // Call next to pass control to the next middleware or route handler
});

// Mount the routes file to the base URL path
app.use('/', userRouter);
app.use('/', topicsRouter);
app.use('/', problemRouter);
app.use('/', numberSetsRouter);
app.use('/', homeRoute);


// Log outgoing responses after they are sent to the client
app.use((req, res, next) => {
    // Store reference to original res.send function
    const originalSend = res.send;

    // Override res.send function to log response details before sending
    res.send = function(data) {
        // Log response status code
        console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);
        
        // Log response headers
        console.log('Headers:', res.getHeaders());

        // Log response body (if present)
        if (data) {
            console.log('Body:', data);
        }

        // Call original res.send function to send response to client
        originalSend.call(this, data);
    };

    next(); // Call next to pass control to the next middleware or route handler
}); 

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


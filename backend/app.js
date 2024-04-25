// This code sets up an Express application with CORS support, middleware for parsing incoming request bodies, 
// and imports the database connection from connection.js to be used within the application.

// required modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors');

// import other modules
const verifyToken = require('./middleware/verify-token')
const bodyParser = require('body-parser');
const logger = require('./utils/logging/logger');
const userController = require('./controllers/users');
const topicsController = require('./controllers/topics');
const numberSetsController = require('./controllers/numbersets');
const homeController = require('./controllers/home')
const pool = require('./pool')

// Create an instance of the Express application
const app = express();

app.use(cors({
    exposedHeaders: ['Authorization']
}));

// Parse incoming request bodies in middleware using 'express.urlencoded' middleware
// This middleware parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));


// Log incoming requests before they reach the router
app.use((req, res, next) => {
    console.log('INCOMING REQUEST BEFORE IT REACHES THE ROUTER')
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Query Params:', req.query);
    if (req.body) {
        console.log('A valid request body came in');
    }
    next();
});

const userRouter = require('./routes/users');
const problemRouter = require('./routes/problems');
const topicsRouter = require('./routes/topics');
const numberSetsRouter = require('./routes/numbersets');
const homeRoute = require('./routes/home');
// const numberSetsRouter = require('./routes/numbersets');

app.use((req, res, next) => {
    // Log request method, URL, and timestamp
    console.log('REQUEST METHOD, URL AND TIMESTAMP')
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Log request headers
    console.log('Headers:', req.headers);

    // Log request query parameters
    console.log('Query Params:', req.query);

    // Log request body (if present and not too large)
    if (req.body) {
        console.log('Request body received');
    }

    next(); // Call next to pass control to the next middleware or route handler
});

// Serve static files from the Angular build folder
app.use(express.static(path.join(__dirname, '../frontend/dist/mathverse/browser')));
// console.log(__dirname)

// Mount the routes to the base URL path
app.use('/', userRouter);
app.use('/', topicsRouter);
app.use('/', problemRouter);
app.use('/', numberSetsRouter);
app.use('/', homeRoute);



// Define catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/mathverse/browser/index.html'));
});

// Log outgoing responses after they are sent to the client
// app.use((req, res, next) => {
//     // Store reference to original res.send function
//     const originalSend = res.send;

//     // Override res.send function to log response details before sending
//     res.send = function (data) {
//         // Log response status code
//         console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);

//         // Log response headers
//         console.log('Headers:', res.getHeaders());

//         // Log response body (if present)
//         if (data) {
//             console.log('Body:' + 'request body is present');
//         }

//         // Call original res.send function to send response to client
//         originalSend.call(this, data);
//     };

//     next(); // Call next to pass control to the next middleware or route handler
// });

// Define error handling middleware
app.use((err, req, res, next) => {
    // logger.debug(err.stack); // Log the error stack trace
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    next(err);
});

// Error handling for route not found
app.use((err, req, res, next) => {
    // logger.debug('Error occurred:', err);
    res.status(404).json({ error: 'Route not found' });
});

// Middleware for the changePassword handler
app.post('/changePassword', verifyToken, userController.changePassword);


//  Log environment variables // debugging only

// for (let key in process.env) {
//   logger.debug(`${key}: ${process.env[key]}`);
// }


// Export the Express application to be used in other parts of your Node.js application
module.exports = app;


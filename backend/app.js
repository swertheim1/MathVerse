// This code sets up an Express application with CORS support, middleware for parsing incoming request bodies, 
// and imports the database connection from connection.js to be used within the application.

// Import the 'express' web application framework for Node.js
const express = require('express');
const morgan = require('morgan');

// Import the 'cors' middleware, to enable Cross-Origin Resource Sharing (CORS) in Express
var cors = require('cors');

const bodyParser = require('body-parser');
const logger = require('./utils/logging/logger');

// Import the MySQL database connection exported from the 'connection.js' file
const pool = require('./pool')

// Create an instance of the Express application
const app = express();

app.use(morgan('dev'));
// Use the 'cors' middleware to enable CORS in the Express app
app.use(cors());

// Parse incoming request bodies in middleware using 'express.urlencoded' middleware
// This middleware parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));


// Parse incoming request bodies in middleware using 'express.json' middleware
// This middleware parses incoming requests with JSON payloads
app.use(express.json());

const userRoute = require('./routes/users');
const problemRoute = require('./routes/problems')
const topicsRoute = require('./routes/topics')

app.use('/mathverse/user', userRoute);
app.use('/mathverse/topics', topicsRoute)
app.use('/mathverse/problem', problemRoute)

// Define error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack); // Log the error stack trace
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
});

// Error handling for route not found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});


// Export the Express application to be used in other parts of your Node.js application
module.exports = app;


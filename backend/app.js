// This code sets up an Express application with CORS support, middleware for parsing incoming request bodies, 
// and imports the database connection from connection.js to be used within the application.

// Import the 'express' web application framework for Node.js
const express = require('express');

// Import the 'cors' middleware, to enable Cross-Origin Resource Sharing (CORS) in Express
var cors = require('cors');

const bodyParser = require('body-parser');

// Import the MySQL database connection exported from the 'connection.js' file
const pool = require('./pool')

const userRoute = require('./routes/user');

// Create an instance of the Express application
const app = express();

// Use the 'cors' middleware to enable CORS in the Express app
app.use(cors({
    
}));

// Parse incoming request bodies in middleware using 'express.urlencoded' middleware
// This middleware parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));


// Parse incoming request bodies in middleware using 'express.json' middleware
// This middleware parses incoming requests with JSON payloads
app.use(express.json());


app.use('/user', userRoute);


// Export the Express application to be used in other parts of your Node.js application
module.exports = app;


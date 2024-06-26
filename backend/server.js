//This code sets up an HTTP server using Node.js's built-in http module and the Express application defined in index.js. 
//It listens for incoming HTTP requests on the port specified in the environment variables, which are loaded using dotenv.

// Import the 'dotenv' module, which loads environment variables from a '.env' file into 'process.env'
require('dotenv').config();

// import winston logger
const logger = require('./utils/logging/logger');

// Import the 'http' module, which provides functionality for creating HTTP servers
const http = require('http');

// Import the Express application exported from the 'index.js' file
const app = require('./app');

// Create an HTTP server using the Express application
const server = http.createServer(app);

// remove the display: none once the page is fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     document.body.style.display = 'block';
//   });

// Listen for incoming HTTP requests on the port specified in the environment variables
// The 'process.env.PORT' variable is set using 'dotenv' which specifies the port for the server to listen on
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

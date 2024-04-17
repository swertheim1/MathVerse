//This code establishes a connection to a MySQL database using the credentials stored in environment variables. 
// It logs a message if the connection is successful and exports the connection object for use in other parts of the application.

// Import the 'mysql' module, which provides an interface for interacting with MySQL databases
const mysql = require('mysql2/promise');
const logger = require('./utils/logging/logger');

// Import the 'dotenv' module, which loads environment variables from a '.env' file into 'process.env'
require('dotenv').config();


// Create a connection pool to the MySQL database using the credentials from the environment variables
var pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,     // Maximum number of connections in the pool
    port: process.env.DB_PORT,                                  // Port number of the MySQL server
    host: process.env.DB_HOST,                                  // Hostname or IP address of the MySQL server
    user: process.env.DB_USERNAME,                              // Username for authenticating with the MySQL server
    password: process.env.DB_PASSWORD,                          // Password for authenticating with the MySQL server
    database: process.env.DB_NAME,                              // Name of the MySQL database to connect to
    waitForConnections: true,                                   // Whether the pool should wait for connections to become available
    queueLimit: 0,                                              // Maximum number of connection requests the pool should queue before returning an error
});

// const user = process.env.DB_USERNAME;

// logger.debug(user);

// Establish a connection to the MySQL database
// Log a message when the pool is created
console.log('Database pool created');

// Export the MySQL database connection to be used in other parts of the Node.js application
module.exports = pool;

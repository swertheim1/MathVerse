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
    port: process.env.DB_PORT, 
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // waitForConnections: true , 
    // queueLimit: 0, 
});

// Test the database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT NOW()');
        console.log('Connected to the database:', rows[0]);
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Call the testConnection function
testConnection();

console.log('Database pool created');

// Export the MySQL database connection to be used in other parts of the Node.js application
module.exports = pool;

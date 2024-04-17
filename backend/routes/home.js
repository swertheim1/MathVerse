// Import required modules
const express = require('express');

// Create an instance of the Express Router
const router = express.Router();

// Define the route handler for the homepage
router.get('/', (req, res) => {
    // Your logic for rendering the homepage goes here
    // res.send('Welcome to the homepage!');
    res.status(201).json({
        message: 'The homepage is available'
    });
});


// Export the router to make it available to other parts of the application
module.exports = router;

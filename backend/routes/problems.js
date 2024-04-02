const express = require('express');
const authController = require('../controllers/problems'); // Importing the object, not just the module
require('dotenv').config();

const router = express.Router();

router.route('/getTopics').post(problemController.topics);
router.route('/getNumberSets').post(problemController.getNumberSets);
router.route('/saveResults').post(problemController.saveResults);

module.exports = router;
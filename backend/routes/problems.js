const express = require('express');
const authController = require('../controllers/problems'); // Importing the object, not just the module
require('dotenv').config();

const router = express.Router();

router.route('/getTopics').post(problemController.signup);
router.route('/getNumberSets').post(problemController.login);
router.route('/saveResults').post(problemController.forgotPassword);

module.exports = router;
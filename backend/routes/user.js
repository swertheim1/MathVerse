const express = require('express');
const authController = require('../controllers/auth'); // Importing the object, not just the module
require('dotenv').config();

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

module.exports = router;



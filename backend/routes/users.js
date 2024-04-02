const express = require('express');
const authController = require('../controllers/auth'); // Importing the object, not just the module
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/changePassword').patch(checkAuth, authController.changePassword);

router.route('/getStudents').get(checkAuth, authController.getStudents);
router.route('/updateGradeLevel').patch(checkAuth, authController.updateGradeLevel);

module.exports = router;


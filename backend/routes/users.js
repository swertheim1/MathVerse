const express = require('express');
const userController = require('../controllers/users'); // Importing the object, not just the module
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

const userRouter = express.Router();

userRouter.route('/signup').post(userController.signup);
userRouter.route('/login').post(userController.login);
userRouter.route('/forgotPassword').post(userController.forgotPassword);
userRouter.route('/resetPassword/:token').patch(userController.resetPassword);
userRouter.route('/changePassword').patch(checkAuth, userController.changePassword);


userRouter.route('/getStudents').get(checkAuth, userController.getStudents);
userRouter.route('/updateGradeLevel').patch(checkAuth, userController.updateGradeLevel);

module.exports = userRouter;


const pool = require("../pool");
const jwt = require("jsonwebtoken")
const logger = require("../utils/logging/logger");
const ValidationService = require("../services/validation");
const AuthenticationService = require("../services/authentication");
const AuthorizationService = require("../services/authorization");
const DataFetchingService = require("../services/data-fetching");
const TokenService = require("../services/token");
const UserService = require('../services/user')

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userController = {}
const authCheck = require("../middleware/check-auth");
const sendEmail = require("../utils/helper/email");


userController.signup = async (req, res, next) => {
    logger.debug("Received POST request to /signup");

    const { firstName, lastName, email, password, age, gradeLevel, role, status } = req.body;
    

    body("firstName").trim().notEmpty();
    body("lastName").trim().notEmpty();
    body("email").isEmail().normalizeEmail();
    body("password").isLength({ min: 8 });
    // body("age").isInt();
    body("gradeLevel").notEmpty();
    body("role").notEmpty();
    body("status").notEmpty();

    const ageValue = age ? parseInt(age) : null;

    try {
        const hash_password = await bcrypt.hash(password, 12);
        const [existingRows] = await pool.query("SELECT * FROM users WHERE email =?", [email]);
        if (existingRows && existingRows.length > 0) {
            return res.status(400).json({ message: "Email already exists." });
        }
        // Since the email does not exist, insert the new user into the database
        // Insert the new user into the database
        const query = "INSERT INTO users (first_name, last_name, email, password, age, grade_level, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await pool.query(query, [firstName, lastName, email, hash_password, ageValue, gradeLevel, role, status]);

        // Respond with success message
        return res.status(201).json({ message: "User registered!" });

    } catch (error) {
        // Handle database query errors
        logger.error("Error adding user to database:", error);
        return res.status(500).json({ 
            message: "Database error",
            error: error
         });
    }
};

userController.login = async (req, res) => {
    try {
        logger.info("Received login request");

        // Validate request body
        const validationErrors = ValidationService.validateLogin(req);
        if (validationErrors.length > 0) {
            logger.error("Validation errors:", validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }

        // Authenticate user by email and password
        const { email, password } = req.body;
        logger.debug(email, password)
        if (!email || !password) {
            logger.error("Email or password is missing");
            return res.status(400).json({ message: "Email or password is missing" });
        }
        const { userExists, passwordMatch, user } = await AuthenticationService.authenticateUserDuringLogin(email, password);
        
        if (!userExists) {
            logger.info("User does not exist for email:", email);
            return res.status(401).json({ message: "Authorization failed" });
        }
        if (!passwordMatch) {
            logger.info("Passwords don't match for email:", email);
            return res.status(401).json({ message: "Authorization failed." });
        }

        // Check if user is approved for access
        if (!AuthorizationService.isApprovedForAccess(user)) {
            logger.info("User not approved for access:", email);
            return res.status(401).json({ message: "Wait for admin approval" });
        }

        // Fetch topics and number sets
        const { topics, numberSets } = await DataFetchingService.fetchUserData(user.grade_level);

        // Generate JWT token
        const token = jwt.sign({
            user_id: user.user_id,
            email: user.email,
            grade_level: user.grade_level
        }, process.env.JWT_KEY, {expiresIn: "4h"});

        // Set Authorization header and respond with success message, token, and other data
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({
            message: "Authorization successful",
            grade_level: user.grade_level,
            // user_id: user.user_id,
            topics: topics,
            numbersets: numberSets,
        });
    } catch (error) {
        // Handle errors
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};


userController.forgotPassword = async (req, res, next) => {
    console.log("Received POST request to /forgotPassword");
    // console.log("Request body:", req.body);
    const { email } = req.body;
    try {
        // Get user from database based on email
        const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = userRows[0];
        console.log("user.email:", user.email);

        // Check if user exists
        if (!user) {
            console.log("Could not find user with the given email.");
            return res.status(404).json({ message: "Could not find user with the given email." });
        }

        // Generate reset token and expiration date
        const token = await createResetPasswordToken(email);
        console.log("token:", token)

        const resetUrl = `${req.protocol}://${req.get("host")}/users/resetPassword/${token.password_reset_token}`;

        logger.debug(resetUrl);
        // logger.debug("resetUrl: ", resetUrl)
        const message = `We have received a password reset request. Please use the below link to reset your password \n\n${resetUrl}\n\n
                        This reset password link will be valid for only 10 minutes.`;
        try {
            await sendEmail({
                email: user.email,
                subject: "Password change request received",
                message: message
            });
            res.status(200).json({
                status: "success",
                message: "Password reset link sent to the user email"
            });
            // Respond to the client
            console.log("Password reset link sent to the user email")



        } catch (err) {
            console.log("Error sending email:", err);
            // Handle email sending error
            return res.status(500).json({ message: "Error sending email to user." });

        }
    } catch (error) {
        console.log("Error in forgotPassword:", error);
        // Handle database query error
        res.status(500).json({ message: "Internal server error." });
    }
};

userController.resetPassword = async (req, res, next) => {
    const token = req.params.token;                 // Access token from URL parameters
    console.log("token from url is: ", token);

    // Hash the token received from the request
    const hashed_token = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed token:", hashed_token);


    try {
        // Retrieve user from the database using the hashed token
        const [userRows] = await pool.query("SELECT * FROM users WHERE password_reset_token = ?", [token]);
        const user = userRows[0];

        // Check if user exists and token is valid
        if (!user || user.password_reset_token_expires < Date.now()) {
            return res.status(400).json({
                status: "error",
                message: "Token is invalid or has expired"
            });
        }

        // UPDATE user"s password and reset token fields
        const newPassword = req.body.password;
        const confirmedPassword = req.body.confirmedPassword;

        // Check if password and confirmedPassword match
        if (newPassword !== confirmedPassword) {
            return res.status(400).json({
                status: "error",
                message: "Password and confirmed password do not match"
            });
        }

        // UPDATE user"s password and reset token fields in the database
        const hash_password = await bcrypt.hash(newPassword, 12);
        const updateQuery = "UPDATE users SET password = ?, password_reset_token = NULL, password_reset_token_expires = NULL WHERE email = ?";
        await pool.query(updateQuery, [hash_password, user.email]);

        res.status(200).json({
            status: "success",
            message: "Password reset successful"
        });

    } catch (error) {
        console.log("Error resetting password:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

userController.changePassword = async (req, res) => {
    console.log("req.body", req.body);
    console.log("res.header", req.headers);
    const { email, reportedPassword, newPassword, confirmPassword } = req.body;
    // const token = req.header.JWT_KEY;

    console.log("changePassword", email, reportedPassword, newPassword, confirmPassword);

    try {
        // Retrieve the current password from the database
        const db_password = await pool.query("SELECT password FROM users WHERE email=?", [email]);

        if (!db_password[0].length) {
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }

        const current_db_password = db_password[0][0].password;

        // Compare reported password with the current password
        const passwordsMatch = await bcrypt.compare(reportedPassword, current_db_password);

        if (!passwordsMatch) {
            return res.status(400).json({
                status: "error",
                message: "Reported password does not match the current password"
            });
        }

        // Ensure new password matches confirmed password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "New password and confirmed password do not match"
            });
        }

        // Hash the new password
        const hash_newPassword = await bcrypt.hash(newPassword, 12);

        // UPDATE the password in the database
        const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
        await pool.query(updateQuery, [hash_newPassword, email]);

        // Password update successful
        console.log("Password reset successful");
        return res.status(200).json({
            status: "success",
            message: "Password reset successful"
        });

    } catch (error) {
        console.log("Error resetting password:", error);
        res.status(500).json({
            status: "error",
            error: error, // Include error details in the response
            message: "Internal server error"
        });
    }
};

// Controller method to retrieve students
userController.getStudents = async (req, res, next) => {
    try {
        // SQL query to select students from the database
        const query = "SELECT user_id, first_name, last_name, email, age, grade_level, role, status, password_reset_token, password_reset_token_expires FROM users WHERE role='student'";

        // Executing the query using the database connection pool
        const [results, fields] = await pool.query(query);
        console.log([results, fields])
        return res.status(200).json(results);

    } catch (error) {
        console.log("Error retrieving users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Controller method to update user status
userController.updateUserStatus = async (req, res, next) => {
    logger.debug(req);
    let user = req.body;
    logger.debug(user)

    // Extracting user_id and status from request
    const user_id = req.body.user_id;
    const { status } = req.body.status;
    logger.debug("user_id", user_id, "status", status)
    var query = "update users set status=? where user_id=?";
    pool.query(query, [status, user_id], (err, results) => {
        if (!err) {
            if (res.affectedRows == 0) {
                return res.status(404).json({ message: "User Id does not exist" });
            }
            return res.status(200).json({ message: "User updated status successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    })
}

// Controller method to update user grade level
userController.updateGradeLevel = async (req, res) => {
    // Extracting user_id and status from request

    const { email, password, grade_level } = req.body;
    logger.debug("email", email, "password", password, "grade_level", grade_level)
    try {
        // Get user from database based on email
        const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = userRows[0];
        console.log("user.email:", user.email);

        // Check if user exists
        // get password from database
        const database_password = await pool.query("SELECT password FROM users WHERE email=?", [email]);
        const db_password = database_password[0][0].password
        logger.debug("db_password", db_password)

        // Compare entered password with the database password
        const passwordsMatch = await bcrypt.compare(password, db_password);
        logger.debug("passwordsMatch", passwordsMatch);

        if (!user || (!passwordsMatch)) {
            // Return error if user does not exist or password does not match
            return res.status(400).json({
                status: "error",
                message: "User does not exist"
            });
        }
        if (passwordsMatch) {
            logger.debug("Passwords match");
            const old_grade_level = await pool.query("SELECT grade_level, email FROM users WHERE email=?", [email]);
            logger.debug("old_grade_level", old_grade_level[0][0].grade_level)   // Log the SQL query

            // Construct the SQL query to update the grade level
            var query = "UPDATE users SET grade_level=? WHERE email=?";
            await pool.query(query, [grade_level, email])

            // Retrieve the updated grade level from the database
            const new_grade_level = await pool.query("SELECT grade_level, email FROM users WHERE email=?", [email]);
            logger.debug("new_grade_level", new_grade_level[0][0].grade_level)
            return res.status(200).json({ message: "User grade level updated successfully" });
        }

    } catch (error) {
        // Handle database query errors
        logger.error("Error updating grade level of user:", error);
        return res.status(500).json({ message: "Database error" });
    }
}


module.exports = userController;

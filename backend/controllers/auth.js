const pool = require('../pool');

// express-validator used for validating and sanitizing input data
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authController = {}
const sendEmail = require('../utils/email')

authController.signup = async (req, res, next) => {
    console.log('Received POST request to /signup');
    console.log('Request body:', req.body);
    const { first_name, last_name, email, password, age, grade_level, role, status } = req.body;

    body('first_name').trim().notEmpty();
    body('last_name').trim().notEmpty();
    body('email').isEmail().normalizeEmail();
    body('password').isLength({ min: 8 });
    body('age').isInt();

    try {
        const hash_password = await bcrypt.hash(password, 12);

        const [existingRows] = await pool.query('SELECT * FROM users WHERE email =?', [email]);

        if (existingRows && existingRows.length > 0) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        // If the email does not exist, insert the new user into the database
        // Insert the new user into the database
        const query = 'INSERT INTO users (first_name, last_name, email, password, age, grade_level, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.query(query, [first_name, last_name, email, hash_password, age, grade_level, role, status]);


        // Respond with success message
        return res.status(201).json({ message: 'User registered!' });

    } catch (error) {
        // Handle database query errors
        console.error('Error adding user to database:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};

authController.login = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure email and password from request body
    const { email, password } = req.body;
    body('email').isEmail().normalizeEmail();

    try {
        // Query the database to find the user by email
        const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // Check if user with provided email exists
        if (userRows.length === 0) {
            return res.status(401).json({ message: 'Incorrect email or password.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, userRows[0].password);

        // If passwords don't match, return error response
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect email or password.' });
        }

        // Check if the user is approved (status === 'true')
        if (userRows[0].status === 'false') {
            return res.status(401).json({ message: 'Wait for admin approval' });
        }

        // Generate and return authentication token if needed (optional step)
        // const authToken = generateAuthToken(userRows[0]);

        // Respond with success message and token if needed
        return res.status(200).json({ message: 'Login successful' /*, token: authToken */ });
    } catch (error) {
        // Handle database query errors
        console.error('Error checking user credentials:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};

// Function to generate a random token that expires in 10 minutes
const createResetPasswordToken = async (email) => {
    console.log('Received call to createResetPasswordToken');
    console.log('email:', email);
    try {
        // Generate a random token
        const originalToken = crypto.randomBytes(32).toString('hex');
        console.log('originalToken: ', originalToken);
        const hashedToken = crypto.createHash('sha256').update(originalToken).digest('hex');
        console.log('hashedToken: ', hashedToken);
        const password_reset_token_expires = new Date(Date.now() + 10 * 60 * 10000); // Reset token expires in 10 hours
        console.log('password_reset_token_expires: ', password_reset_token_expires)

        // UPDATE the user's password reset token and expiration date in the database
        const updateQuery = 'UPDATE Users SET password_reset_token = ?, password_reset_token_expires = ? WHERE email = ?';
        await pool.query(updateQuery, [hashedToken, password_reset_token_expires, email]);

        console.log('Password reset token and expiration date updated successfully for user:', email);
        return { password_reset_token: originalToken, password_reset_token_expires };

    } catch (error) {
        console.error('Error updating password reset token and expiration date:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
};

authController.forgotPassword = async (req, res, next) => {
    console.log('Received POST request to /forgotPassword');
    console.log('Request body:', req.body);
    const { email } = req.body;
    try {
        // Get user from database based on email
        const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = userRows[0];
        console.log('user.email:', user.email);

        // Check if user exists
        if (!user) {
            console.error('Could not find user with the given email.');
            return res.status(404).json({ message: 'Could not find user with the given email.' });
        }

        // Generate reset token and expiration date
        const token = await createResetPasswordToken(email);
        console.log('token:', token)

        // Log SMTP configuration details
        console.log('SMTP Configuration in ForgotPassword function:');
        console.log('Host:', process.env.EMAIL_HOST);
        console.log('Port:', process.env.EMAIL_PORT);
        console.log('Username:', process.env.EMAIL_USER);
        console.log('Password:', process.env.EMAIL_PASSWORD);


        // Send email to user with reset token
        const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${token.resetToken}`;
        console.log('resetUrl: ', resetUrl)
        const message = `We have received a password reset request. Please use the below link to reset your password \n\n${resetUrl}\n\n
                        This reset password link will be valid for only 10 minutes.`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Password change request received',
                message: message
            });
            res.status(200).json({
                status: 'success',
                message: 'Password reset link sent to the user email'
            });
            // Respond to the client
            console.log('Password reset link sent to the user email')



        } catch (err) {
            console.error('Error sending email:', err);
            // Handle email sending error
            return res.status(500).json({ message: 'Error sending email to user.' });

        }
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        // Handle database query error
        res.status(500).json({ message: 'Internal server error.' });
    }
};

authController.resetPassword = async (req, res, next) => {
    const token = req.params.token;                 // Access token from URL parameters
    console.log('token from url is: ', token);

    // Hash the token received from the request
    const hashed_token = crypto.createHash('sha256').update(token).digest('hex');
    console.log('Hashed token:', hashed_token);


    try {
        // Retrieve user from the database using the hashed token
        const [userRows] = await pool.query('SELECT * FROM users WHERE password_reset_token = ?', [token]);
        const user = userRows[0];

        // Check if user exists and token is valid
        if (!user || user.password_reset_token_expires < Date.now()) {
            return res.status(400).json({
                status: "error",
                message: "Token is invalid or has expired"
            });
        }

        // UPDATE user's password and reset token fields
        const newPassword = req.body.password;
        const confirmedPassword = req.body.confirmedPassword;

        // Check if password and confirmedPassword match
        if (newPassword !== confirmedPassword) {
            return res.status(400).json({
                status: "error",
                message: "Password and confirmed password do not match"
            });
        }

        // UPDATE user's password and reset token fields in the database
        const hash_password = await bcrypt.hash(newPassword, 12);
        const updateQuery = 'UPDATE users SET password = ?, password_reset_token = NULL, password_reset_token_expires = NULL WHERE email = ?';
        await pool.query(updateQuery, [hash_password, user.email]);

        res.status(200).json({
            status: "success",
            message: "Password reset successful"
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

authController.changePassword = async (req, res) => {
    const { email, reportedPassword, newPassword, confirmPassword } = req.body;
    console.log('changePassword', email, reportedPassword, newPassword, confirmPassword)

    try {
        // Hash the reported password
        const hash_reportedPassword = await bcrypt.hash(reportedPassword, 12);

        // Retrieve the current password from the database
        const db_password = await pool.query("SELECT password FROM users WHERE email=?", [email]);
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
        const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
        await pool.query(updateQuery, [hash_newPassword, email]);

        console.log('Password reset successful');
        res.status(200).json({
            status: "success",
            message: "Password reset successful"
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

// Controller method to retrieve students
authController.getStudents = async (req, res, next) => {
    try {
        // SQL query to select students from the database
        const query = "SELECT user_id, first_name, last_name, email, age, grade_level, role, status, password_reset_token, password_reset_token_expires FROM users WHERE role='student'";

        // Executing the query using the database connection pool
        const [results, fields] = await pool.query(query);
        console.log([results, fields])
        return res.status(200).json(results);

    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method to update user status
authController.updateUserStatus = async (req, res, next) => {
    console.log(req);
    let user = req.body;
    console.log(user)

    // Extracting user_id and status from request
    const user_id = req.body.user_id;
    const { status } = req.body.status;
    console.log('user_id', user_id, 'status', status)

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
authController.updateGradeLevel = async (req, res) => {
    // Extracting user_id and status from request

    const { email, password, grade_level } = req.body;
    console.log('email', email, 'password', password, "grade_level", grade_level)
    try {
        // Get user from database based on email
        const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = userRows[0];
        console.log('user.email:', user.email);

        // Check if user exists


        // get password from database
        const database_password = await pool.query("SELECT password FROM users WHERE email=?", [email]);
        const db_password = database_password[0][0].password
        console.log('db_password', db_password)

        // Compare entered password with the database password
        const passwordsMatch = await bcrypt.compare(password, db_password);
        console.log('passwordsMatch', passwordsMatch);
    
        if (!user || (!passwordsMatch)) {
            // Return error if user does not exist or password does not match
            return res.status(400).json({
                status: "error",
                message: "User does not exist"
            });
        }

        if (passwordsMatch) {
            console.log('Passwords match');
            const old_grade_level = await pool.query("SELECT grade_level, email FROM users WHERE email=?", [email]);
            console.log('old_grade_level', old_grade_level[0][0].grade_level)   // Log the SQL query
            
            // Construct the SQL query to update the grade level
            var query = "UPDATE users SET grade_level=? WHERE email=?";

            await pool.query(query, [grade_level, email])
            
             // Retrieve the updated grade level from the database
            const new_grade_level = await pool.query("SELECT grade_level, email FROM users WHERE email=?", [email]);
            console.log('new_grade_level', new_grade_level[0][0].grade_level)
            return res.status(200).json({ message: "User grade level updated successfully" });
        }

    } catch (error) {
        // Handle database query errors
        console.error('Error updating grade level of user:', error);
        return res.status(500).json({ message: 'Database error' });
    }
}


module.exports = authController;

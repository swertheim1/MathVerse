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
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordRestTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // Reset token expires in 10 minutes

        // Update the user's password reset token and expiration date in the database
        const updateQuery = 'UPDATE Users SET password_rest_token = ?, password_rest_token_expires = ? WHERE email = ?';
        await pool.query(updateQuery, [resetToken, passwordRestTokenExpires, email]);

        console.log('Password reset token and expiration date updated successfully for user:', email);
        return { resetToken, passwordRestTokenExpires };
        
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

        // Check if user exists
        if (!user) {
            console.error('Could not find user with the given email.');
            return res.status(404).json({ message: 'Could not find user with the given email.' });
        }

        // Generate reset token and expiration date
        const token = await createResetPasswordToken(email);

         // Log SMTP configuration details
         console.log('SMTP Configuration in ForgotPassword function:');
         console.log('Host:', process.env.EMAIL_HOST);
         console.log('Port:', process.env.EMAIL_PORT);
         console.log('Username:', process.env.EMAIL_USER);
         console.log('Password:', process.env.EMAIL_PASSWORD);
         console.log('Request Protocol: ', req.protocol)

        // Send email to user with reset token
        const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${token.resetToken}`;
        console.log('resetUrl: ', resetUrl)
        const message = `We have received a password reset request. Please use the below link to reset your password \n\n${resetUrl}\n\nThis reset password link will be valid for only 10 minutes.`;
        try {
            await sendEmail({
                email: user.email, 
                subject: 'Password change request received',
                message: message
            });
            // Respond to the client
            console.log('Password reset link sent to the user email' )
            
            res.status(200).json({
                status:'success', 
                message: 'Password reset link sent to the user email' });

        } catch(err) {
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

authController.resetPassword = (req, res, next) => {

}

module.exports = authController;

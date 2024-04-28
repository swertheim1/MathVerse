
const pool = require("../pool");
const bcrypt = require("bcryptjs");
const userService = require('./user')
const logger = require("../utils/logging/logger");

class AuthenticationService {
    static async authenticateUserDuringSaveRequest(email) {
        try {
            const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            if (userRows.length === 0) {
                return { userExists: false };
            }
            return { userExists: true, user: userRows[0] };
        } catch (error) {
            console.error('Error authenticating user by email:', error);
            throw error;
        }
    }
    // Extract email from token and authenticate user by email
    static async authenticateUserDuringLogin(email, password) {
        try {

            // Validate email and password
            if (!email || !password) {
                return { userExists: false, passwordMatch: false }; // Both email and password are required
            }
            // Fetch user from database based on email
            const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            if (userRows.length === 0) {
                return { userExists: false };
            }

            // Check if the provided password matches the stored password
            const passwordMatch = await bcrypt.compare(password, userRows[0].password);
            return { userExists: true, passwordMatch, user: userRows[0] };
        } catch (error) {
            console.error('Error authenticating user during login:', error);
            throw error;
        }
    }
}

module.exports = AuthenticationService;

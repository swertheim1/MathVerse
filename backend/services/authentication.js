
const pool = require("../pool");
const bcrypt = require("bcryptjs");

class AuthenticationService {
    static async authenticateUser(email, password) {
        const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (userRows.length === 0) {
            return { userExists: false };
        }

        const passwordMatch = await bcrypt.compare(password, userRows[0].password);
        return { userExists: true, passwordMatch, user: userRows[0] };
    }
}

module.exports = AuthenticationService;

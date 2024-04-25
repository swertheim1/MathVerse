
const jwt = require("jsonwebtoken");

class TokenService {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
    }
}

module.exports = TokenService;
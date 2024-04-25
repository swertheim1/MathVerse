const { validationResult } = require("express-validator");

class ValidationService {
    static validateLogin(req) {
        const errors = validationResult(req);
        return errors.array();
    }
}

module.exports = ValidationService;
// authorization.service.js
class AuthorizationService {
    static isApprovedForAccess(user) {
        return user.status === "true";
    }
}

module.exports = AuthorizationService;

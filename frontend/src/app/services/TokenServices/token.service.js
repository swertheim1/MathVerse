"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var environment_1 = require("../../../environments/environment");
var TokenService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TokenService = _classThis = /** @class */ (function () {
        function TokenService_1(cookieService) {
            this.cookieService = cookieService;
            this.token = null;
            this.cachedTopics = [];
            this.cachedNumbersets = [];
            this.apiUrl = environment_1.environment.apiUrl;
        }
        TokenService_1.prototype.decodeToken = function (token) {
            try {
                return (0, jwt_decode_1.jwtDecode)(token);
            }
            catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        };
        TokenService_1.prototype.setToken = function (authToken) {
            localStorage.setItem('authToken', authToken);
            console.log("retrieving token from storage", localStorage.getItem('authToken'));
        };
        TokenService_1.prototype.getToken = function () {
            // Retrieve token from local storage
            var token = localStorage.getItem('authToken');
            // If token is null, throw an error or handle it accordingly
            if (token === null) {
                throw new Error('Token is not found in local storage.');
            }
            // Return the token
            return token;
        };
        TokenService_1.prototype.parseToken = function (authToken) {
            if (authToken && authToken.startsWith('Bearer')) {
                var parsedToken = authToken.split(' ');
                console.log('Parsed token:', parsedToken[1]);
                return parsedToken[1];
            }
            else {
                console.error('Invalid token format');
                return ''; // Return empty string if token format is invalid
            }
        };
        TokenService_1.prototype.getTokenExpirationDate = function (token) {
            var decodedToken = this.decodeToken(token);
            if (!decodedToken || !decodedToken.exp) {
                return null; // Token is invalid or doesn't have an expiration date
            }
            var expirationDate = new Date(0); // Start date (epoch time)
            expirationDate.setUTCSeconds(decodedToken.exp);
            return expirationDate;
        };
        TokenService_1.prototype.isTokenNotExpired = function (token) {
            try {
                var decodedToken = (0, jwt_decode_1.jwtDecode)(token);
                var expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
                var currentTime = Date.now();
                console.log("Current time: ".concat(new Date(currentTime).toISOString()));
                console.log("Expiration time: ".concat(new Date(expirationTime).toISOString()));
                console.log('currentTime < expirationTime', currentTime < expirationTime);
                return currentTime < expirationTime; // Token is considered valid if current time is less than expiration time
            }
            catch (error) {
                console.error('Token decoding error:', error);
                return false; // Treat decoding errors as token being expired
            }
        };
        return TokenService_1;
    }());
    __setFunctionName(_classThis, "TokenService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TokenService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TokenService = _classThis;
}();
exports.TokenService = TokenService;

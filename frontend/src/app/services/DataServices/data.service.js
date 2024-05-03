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
exports.DataService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../../environments/environment");
var DataService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DataService = _classThis = /** @class */ (function () {
        function DataService_1(httpClient, userService) {
            this.httpClient = httpClient;
            this.userService = userService;
            this.apiUrl = environment_1.environment.apiUrl;
            this.topicsSubject = new rxjs_1.BehaviorSubject([]);
            this.topics$ = this.topicsSubject.asObservable();
        }
        // Send results to database
        // Need to include user_id, from local storage
        DataService_1.prototype.saveResultsToDatabase = function (topic, numberset, totalCorrect, totalQuestions) {
            var user_id = this.userService.getUserIdFromLocalStorage();
            var grade_level = this.userService.getGradeLevelFromLocalStorage();
            var saveResultsUrl = "".concat(this.apiUrl, "/saveResults");
            var data = { user_id: user_id, grade_level: grade_level, topic: topic, numberset: numberset, totalCorrect: totalCorrect, totalQuestions: totalQuestions };
            var headers = new http_1.HttpHeaders({
                'Content-type': 'application/json'
            });
            // Return the observable created by the HttpClient's post method
            return this.httpClient.post(saveResultsUrl, data, { headers: headers });
        };
        DataService_1.prototype.getResultsFromDatabase = function (user_id) {
            console.log("Get Results from Database has been accessed");
            var authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('Authentication token not found');
                return (0, rxjs_1.of)([]); // return an empty array if authToken not found 
            }
            var headers = new http_1.HttpHeaders()
                .set('Authorization', "Bearer ".concat(authToken))
                .set('Content-Type', 'application/json'); // Set content type to JSON
            // Prepare request body with grade_level
            var params = new http_1.HttpParams();
            if (user_id !== null) {
                params = params.set('user_id', user_id.toString());
            }
            return this.httpClient.get("".concat(this.apiUrl, "/getResults"), { headers: headers, params: params })
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        DataService_1.prototype.handleError = function (error) {
            if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', error.error.message);
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong.
                console.error("Backend returned code ".concat(error.status, ", ") +
                    "body was: ".concat(error.error));
            }
            // Return an observable with a user-facing error message.
            return (0, rxjs_1.throwError)('Something bad happened; please try again later.');
        };
        DataService_1.prototype.calculateRolledUpStatistics = function (results) {
            console.log("Calculate Rolled up Statistics has been accessed");
            var rolledUpStatistics = [];
            results.forEach(function (result) {
                // console.log("Processing result:", result);
                var topic_name = result.topic_name, numberset_name = result.numberset_name, number_correct = result.number_correct, number_of_questions = result.number_of_questions;
                // Check if the statistics already exist for this topic and numberset
                var existingStatisticIndex = rolledUpStatistics.findIndex(function (statistic) { return statistic.topic === topic_name && statistic.numberset === numberset_name; });
                if (existingStatisticIndex !== -1) {
                    // If the statistics exist, update them
                    rolledUpStatistics[existingStatisticIndex].number_correct += number_correct;
                    rolledUpStatistics[existingStatisticIndex].number_of_questions += number_of_questions;
                }
                else {
                    // If the statistics don't exist, add them
                    rolledUpStatistics.push({
                        topic: topic_name,
                        numberset: numberset_name,
                        number_correct: number_correct,
                        number_of_questions: number_of_questions
                    });
                }
            });
            console.log("Returning observable with results");
            return rolledUpStatistics;
        };
        // Get from local storage or from server if not in local storage
        DataService_1.prototype.getTopics = function () {
            // Retrieve authentication token from local storage
            var authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('Authentication token not found');
                console.log("User needs to log back in.");
                return (0, rxjs_1.of)([]);
            }
            // get grade_level from user service
            var grade_level = this.userService.getGradeLevelFromLocalStorage();
            if (grade_level !== null) {
                // Prepare request headers with authentication token 
                var headers = new http_1.HttpHeaders()
                    .set('Authorization', "Bearer ".concat(authToken))
                    .set('Content-Type', 'application/x-www-form-urlencoded');
                var params = new http_1.HttpParams().set('grade_level', grade_level);
                // Make HTTP GET request to fetch topics
                return this.httpClient.get("".concat(this.apiUrl, "/topics"), { headers: headers, params: params })
                    .pipe((0, rxjs_1.tap)(function (topics) {
                    // store topics directly in local storage
                    localStorage.setItem('topics_list', JSON.stringify(topics));
                    // store user_id directly in local storage
                    console.log('Topics added to local storage');
                }), (0, rxjs_1.catchError)(function (error) {
                    console.error('Error fetching topics:', error);
                    return (0, rxjs_1.of)([]); // Return an empty array in case of error
                }));
            }
            else {
                console.error('User needs to log back in');
                return (0, rxjs_1.of)([]); // Grade Level not available so return an empty string
            }
        };
        // Get from local storage or from server if not in local storage
        DataService_1.prototype.getNumbersets = function () {
            // Retrieve authentication token from local storage
            var authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('Authentication token not found');
                return (0, rxjs_1.of)([]); // Return empty array if authentication token is not found
            }
            // get grade_level from user service
            var grade_level = this.userService.getGradeLevelFromLocalStorage();
            if (grade_level !== null) {
                // Prepare request headers with authentication token 
                var headers = new http_1.HttpHeaders()
                    .set('Authorization', "Bearer ".concat(authToken))
                    .set('Content-Type', 'application/x-www-form-urlencoded');
                var params = new http_1.HttpParams().set('grade_level', grade_level);
                // Make HTTP GET request to fetch numbersets
                return this.httpClient.get("".concat(this.apiUrl, "/numbersets"), { headers: headers, params: params })
                    .pipe((0, rxjs_1.tap)(function (numbersets) {
                    // store numbersets directly in local storage
                    localStorage.setItem('numbersets_list', JSON.stringify(numbersets));
                    console.log('Numbersets added to local storage');
                }), (0, rxjs_1.catchError)(function (error) {
                    console.error('Error fetching numbersets:', error);
                    return (0, rxjs_1.of)([]); // Return an empty array in case of error
                }));
            }
            else {
                console.error('User needs to log back in');
                return (0, rxjs_1.of)([]); // Grade Level not available so return an empty string
            }
        };
        DataService_1.prototype.setResults = function (results) {
            this.results = results;
        };
        DataService_1.prototype.getResults = function () {
            return this.results;
        };
        return DataService_1;
    }());
    __setFunctionName(_classThis, "DataService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DataService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DataService = _classThis;
}();
exports.DataService = DataService;

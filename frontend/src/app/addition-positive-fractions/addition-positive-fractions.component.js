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
exports.AdditionPositiveFractionsComponent = void 0;
var core_1 = require("@angular/core");
var AdditionPositiveFractionsComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-addition-positive-fractions',
            templateUrl: './addition-positive-fractions.component.html',
            styleUrls: ['./addition-positive-fractions.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdditionPositiveFractionsComponent = _classThis = /** @class */ (function () {
        function AdditionPositiveFractionsComponent_1(dataService, randomFractionService, randomWholeNumberService, router) {
            this.dataService = dataService;
            this.randomFractionService = randomFractionService;
            this.randomWholeNumberService = randomWholeNumberService;
            this.router = router;
            this.TOPIC = 'Addition';
            this.NUMBERSET = 'Fractions';
            this.numerator1 = 0;
            this.denominator1 = 0;
            this.numerator2 = 0;
            this.denominator2 = 0;
            this.fraction1 = { numerator1: 0, denominator1: 1 };
            this.fraction2 = { numerator2: 0, denominator2: 1 };
            this.actualFraction1 = { numerator: 0, denominator: 1 };
            this.actualFraction2 = { numerator: 0, denominator: 1 };
            this.MIN_NUM1 = 1;
            this.MAX_NUM1 = 12;
            this.MIN_DEM1 = 1;
            this.MAX_DEM1 = 12;
            this.MIN_NUM2 = 1;
            this.MAX_NUM2 = 12;
            this.MIN_DEM2 = 1;
            this.MAX_DEM2 = 12;
            this.answerList = [];
            this.answer = { numerator: 0, denominator: 1 };
            this.alternateAnswer = { numerator: 0, denominator: 1 };
            this.expression = '';
            this.numberOfQuestionsAsked = 0; // Counter for questions asked
            this.totalQuestionsToAsk = 10; // total number of questions to ask
            this.numberOfAttempts = 0; // Counter to keep track of the number of times an answer was tried
            this.numberOfCorrectAnswers = 0; // Counter for correct answers
            this.numberOfAttemptsAllowed = 1;
        }
        AdditionPositiveFractionsComponent_1.prototype.ngOnInit = function () {
            this.generateProblem();
            this.generateExpression();
            if (this.numberOfQuestionsAsked < this.totalQuestionsToAsk) {
                console.log('Random numbers: ', this.numerator1, this.denominator1, 'Expression: ', this.expression, 'Answer: ', this.numerator2, this.denominator2);
                this.shuffleAnswerList();
            }
        };
        // ngAfterViewInit() {
        //   this.shuffleAnswerList();
        //   // console.log('answer list accessed in ngAfterViewInit', this.answerList)
        // }
        AdditionPositiveFractionsComponent_1.prototype.generateProblem = function () {
            console.log('Generate Problem function accessed');
            // Generate random fractions
            this.actualFraction1 = this.randomFractionService.generateRandomFraction(this.MIN_NUM1, this.MAX_NUM1, this.MIN_DEM1, this.MAX_DEM1);
            if (this.actualFraction1.numerator > this.actualFraction1.denominator) {
                var temp = this.actualFraction1.numerator;
                this.actualFraction1.numerator = this.actualFraction1.denominator;
                this.actualFraction1.denominator = temp;
            }
            this.actualFraction2 = this.randomFractionService.generateRandomFraction(this.MIN_NUM2, this.MAX_NUM2, this.MIN_DEM2, this.MAX_DEM2);
            if (this.actualFraction2.numerator > this.actualFraction2.denominator) {
                var temp = this.actualFraction2.numerator;
                this.actualFraction2.numerator = this.actualFraction2.denominator;
                this.actualFraction2.denominator = temp;
            }
            // Add the fractions
            this.answer = this.addFractions(this.actualFraction1, this.actualFraction2);
            // Push the initial answer value into answerList
            this.answerList.push(this.answer);
        };
        AdditionPositiveFractionsComponent_1.prototype.addFractions = function (fraction1, fraction2) {
            // Calculate the common denominator
            var commonDenominator = fraction1.denominator * fraction2.denominator;
            // Calculate the numerators after adjusting for the common denominator
            var adjustedNumerator1 = fraction1.numerator * fraction2.denominator;
            var adjustedNumerator2 = fraction2.numerator * fraction1.denominator;
            // Calculate the sum of the numerators
            var sumNumerator = adjustedNumerator1 + adjustedNumerator2;
            // Simplify the result
            var divisor = this.randomFractionService.gcd(sumNumerator, commonDenominator);
            var simplifiedNumerator = sumNumerator / divisor;
            var simplifiedDenominator = commonDenominator / divisor;
            return { numerator: simplifiedNumerator, denominator: simplifiedDenominator }; //answer of the sum of the fractions
        };
        // generateExpression() {
        //   console.log('generate an expression function accessed')
        //   this.answerList = [];
        //   if (this.numberOfQuestionsAsked < this.totalQuestionsToAsk) {
        //     // if there are more questions to ask, generate another expression      
        //     this.expression = `${this.actualFraction1.numerator} / ${this.actualFraction1.denominator} + ${this.actualFraction2.numerator} / ${this.actualFraction2.denominator}`;
        //     console.log(this.expression)
        //     this.generateAlternateAnswers();
        //     this.numberOfQuestionsAsked++;
        //     this.numberOfAttempts = 0;
        //   }
        //   // if maximum number of problems have already been generated
        //   else {
        //     const dataToSend = {
        //       topic: this.TOPIC,
        //       numberset: this.NUMBERSET,
        //       totalQuestions: this.totalQuestionsToAsk,
        //       totalCorrect: this.numberOfCorrectAnswers,
        //     };
        //     this.dataService.setResults(dataToSend)
        //     console.log('Data sent to ResultsDataService:', dataToSend)
        //     this.sendResults();
        //   }
        // }
        AdditionPositiveFractionsComponent_1.prototype.generateExpression = function () {
            var fractions = [
                [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6],
                [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8],
                [7, 8], [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10],
                [9, 10], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11],
                [9, 11], [10, 11], [1, 12], [5, 12], [7, 12], [11, 12]
            ];
            // Select two random fractions
            var randomIndex1 = this.randomWholeNumberService.generateIntegers(0, fractions.length - 1);
            var randomIndex2 = this.randomWholeNumberService.generateIntegers(0, fractions.length - 1);
            while (randomIndex2 === randomIndex1) {
                randomIndex2 = this.randomWholeNumberService.generateIntegers(0, fractions.length - 1);
            }
            var fraction1 = fractions[randomIndex1];
            var fraction2 = fractions[randomIndex2];
            // Generate the expression
            var numerator1 = fraction1[0];
            var denominator1 = fraction1[1];
            var numerator2 = fraction2[0];
            var denominator2 = fraction2[1];
            var _a = this.simplifyFraction(numerator1 * denominator2 + numerator2 * denominator1, denominator1 * denominator2), numeratorSum = _a[0], denominatorSum = _a[1];
            // Correct answer
            var correctAnswer = "".concat(numeratorSum, "/").concat(denominatorSum);
            // Generate 5 alternate answers
            var alternateAnswers = [];
            for (var i = 0; i < 5; i++) {
                var alternateNumerator = this.randomWholeNumberService.generateIntegers(1, numeratorSum + denominatorSum - 1);
                var alternateDenominator = this.randomWholeNumberService.generateIntegers(1, denominatorSum + numeratorSum - 1);
                // Ensure alternate fraction is different from correct answer
                while (alternateNumerator / alternateDenominator === numeratorSum / denominatorSum || alternateNumerator === numeratorSum || alternateDenominator === denominatorSum) {
                    alternateNumerator = this.randomWholeNumberService.generateIntegers(1, numeratorSum + denominatorSum - 1);
                    alternateDenominator = this.randomWholeNumberService.generateIntegers(1, denominatorSum + numeratorSum - 1);
                }
                alternateAnswers.push("".concat(alternateNumerator, "/").concat(alternateDenominator));
            }
            return {
                expression: "".concat(numerator1, "/").concat(denominator1, " + ").concat(numerator2, "/").concat(denominator2),
                correctAnswer: correctAnswer,
                alternateAnswers: alternateAnswers
            };
        };
        AdditionPositiveFractionsComponent_1.prototype.gcd = function (a, b) {
            if (b === 0) {
                return a;
            }
            return this.gcd(b, a % b);
        };
        AdditionPositiveFractionsComponent_1.prototype.simplifyFraction = function (numerator, denominator) {
            var divisor = this.gcd(numerator, denominator);
            return [numerator / divisor, denominator / divisor];
        };
        AdditionPositiveFractionsComponent_1.prototype.sendResults = function () {
            var _this = this;
            var dataToSend = {
                topic: this.TOPIC,
                numberset: this.NUMBERSET,
                totalQuestions: this.totalQuestionsToAsk,
                totalCorrect: this.numberOfCorrectAnswers,
            };
            // this.dataService.setResults(dataToSend)
            console.log('Data sent to ResultsDataService:', dataToSend);
            console.log('DATA TO SEND TO REPORTS PAGE:', dataToSend);
            var topic = dataToSend.topic, numberset = dataToSend.numberset, totalCorrect = dataToSend.totalCorrect, totalQuestions = dataToSend.totalQuestions;
            // Navigate to the reports page with the data
            this.router.navigate(['../reports'], {
                state: {
                    topic: topic,
                    numberset: numberset,
                    totalCorrect: totalCorrect,
                    totalQuestions: totalQuestions
                }
            }).then(function () {
                // After navigation, save results to the database
                _this.dataService.saveResultsToDatabase(topic, numberset, totalCorrect, totalQuestions)
                    .subscribe(function (response) {
                    console.log('Results saved to database:', response);
                    // Optionally, you can handle success response here
                }, function (error) {
                    console.error('Error saving results to database:', error);
                    // Handle error appropriately
                });
            });
        };
        AdditionPositiveFractionsComponent_1.prototype.generateAlternateAnswers = function () {
            console.log('generate an alternate answer function accessed');
            // Clear the answer list before generating new alternate answers
            this.answerList = [];
            // Add the correct answer to the list
            this.answerList.push(this.answer);
            while (this.answerList.length < 6) {
                // Generate a new alternate answer in each iteration
                var alternateFraction1 = this.randomFractionService.generateRandomFraction(this.MIN_NUM1, this.MAX_NUM1, this.MIN_DEM1, this.MAX_DEM1);
                var alternateFraction2 = this.randomFractionService.generateRandomFraction(this.MIN_NUM2, this.MAX_NUM2, this.MIN_DEM2, this.MAX_DEM2);
                // Add the alternate answer to the list if it's not equal to the correct answer
                var alternateAnswer = this.addFractions(alternateFraction1, alternateFraction2);
                if (!this.areFractionsEqual(alternateAnswer, this.answer)) {
                    this.answerList.push(alternateAnswer);
                }
            }
            // Shuffle the answer list to randomize the order
            this.shuffleAnswerList();
            console.log(this.answerList);
            return this.answerList;
        };
        // Function to compare two fractions
        AdditionPositiveFractionsComponent_1.prototype.areFractionsEqual = function (fraction1, fraction2) {
            return fraction1.numerator === fraction2.numerator && fraction1.denominator === fraction2.denominator;
        };
        AdditionPositiveFractionsComponent_1.prototype.shuffleAnswerList = function () {
            console.log('shuffle answer list function accessed');
            // Fisher-Yates algorithm
            // Picks a random item in the array then swaps with the current iteration
            console.log('unshuffled answer list', this.answerList);
            for (var i = this.answerList.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = this.answerList[i];
                this.answerList[i] = this.answerList[j];
                this.answerList[j] = temp;
            }
            console.log('shuffled answer list', this.answerList);
        };
        // Handle button click to check the answer
        AdditionPositiveFractionsComponent_1.prototype.checkAnswer = function (selectedAnswer) {
            if (selectedAnswer === void 0) { selectedAnswer = { numerator: 0, denominator: 1 }; }
            console.log('check answer function accessed');
            // count the number of attempts to answer the question correctly
            this.numberOfAttempts++;
            console.log('number of uniques questions asked', this.numberOfQuestionsAsked);
            console.log("number of attempts after clicking an answer ".concat(this.numberOfAttempts));
            console.log("number of questions answered correctly is: ".concat(this.numberOfCorrectAnswers));
            if (selectedAnswer.numerator === this.answer.numerator && selectedAnswer.denominator === this.answer.denominator) {
                // Correct answer
                this.numberOfCorrectAnswers++;
                console.log("Correct answer selected.");
            }
            else {
                // Incorrect answer
                console.log("incorrect answer selected.");
            }
            this.generateProblem();
        };
        return AdditionPositiveFractionsComponent_1;
    }());
    __setFunctionName(_classThis, "AdditionPositiveFractionsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdditionPositiveFractionsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdditionPositiveFractionsComponent = _classThis;
}();
exports.AdditionPositiveFractionsComponent = AdditionPositiveFractionsComponent;

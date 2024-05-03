import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/DataServices/data.service';
import { RandomFractionsService } from '../services/Calculations/RandomNumbers/random-fractions.service';
import { RandomWholeNumbersService } from '../services/Calculations/RandomNumbers/random-whole-numbers.service';



@Component({
  selector: 'app-addition-positive-fractions',
  templateUrl: './addition-positive-fractions.component.html',
  styleUrls: ['./addition-positive-fractions.component.scss']
})

export class AdditionPositiveFractionsComponent {
  TOPIC: string = 'Addition';
  NUMBERSET: string = 'Fractions'
  numerator1: number = 0;
  denominator1: number = 0;
  numerator2: number = 0;
  denominator2: number = 0;
  fraction1: { numerator1: number, denominator1: number } = { numerator1: 0, denominator1: 1 };
  fraction2: { numerator2: number, denominator2: number } = { numerator2: 0, denominator2: 1 };
  actualFraction1: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 };
  actualFraction2: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 };
  actualAnswer: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 };
  MIN_NUM1: number = 1;
  MAX_NUM1: number = 12;
  MIN_DEM1: number = 1;
  MAX_DEM1: number = 12;
  MIN_NUM2: number = 1;
  MAX_NUM2: number = 12;
  MIN_DEM2: number = 1;
  MAX_DEM2: number = 12;
  answerList: { numerator: number, denominator: number }[] = [];
  answer: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 };
  alternateAnswer: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 };

  expression: string = '';
  numberOfQuestionsAsked: number = 0;     // Counter for questions asked
  totalQuestionsToAsk: number = 3;        // total number of questions to ask
  numberOfAttempts: number = 0;           // Counter to keep track of the number of times an answer was tried
  numberOfCorrectAnswers: number = 0;     // Counter for correct answers
  numberOfAttemptsAllowed: number = 1;
  fractions = [
    [1, 2], [1, 3], [2, 3], [1, 4], [1, 5], [2, 5], [1, 6], [1, 7], [2, 7], [3, 7], [1, 8], [3, 8], [1, 9], [2, 9], [4, 9], 
    [1, 10], [3, 10], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [1, 12], [5, 12]
  ];

  constructor(
    private dataService: DataService,
    private randomFractionService: RandomFractionsService,
    private randomWholeNumberService: RandomWholeNumbersService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('Component initialized');

    this.generateProblem();
    // this.generateAlternateAnswers();
    if (this.numberOfQuestionsAsked < this.totalQuestionsToAsk) {
      console.log('Random numbers: ', this.numerator1, this.denominator1, 'Expression: ',
        this.expression, 'Answer: ', this.numerator2, this.denominator2);

      this.shuffleAnswerList();
    }
  }

  generateProblem(): void {
    console.log('Generate Problem function accessed');

    // Generate random fractions
    // Pick a random index
    const randomIndex1 = Math.floor(Math.random() * this.fractions.length);
    const randomIndex2 = Math.floor(Math.random() * this.fractions.length);

    // Get the random pair of numbers
    const fractionParts1 = this.fractions[randomIndex1];
    const fractionParts2 = this.fractions[randomIndex2];
    this.actualFraction1 = {numerator: fractionParts1[0], denominator: fractionParts1[1]}
    this.actualFraction2 = {numerator: fractionParts2[0], denominator: fractionParts2[1]}


    console.log('first problem fraction', this.actualFraction1.numerator, '/', this.actualFraction1.denominator)
    console.log('2nd problem fraction', this.actualFraction2.numerator, '/', this.actualFraction2.denominator)

    console.log('ActualFraction1: Fraction 1', this.actualFraction1.numerator, '/', this.actualFraction1.denominator);
    console.log('ActualFraction2: Fraction 2', this.actualFraction2.numerator, '/', this.actualFraction2.denominator);
    
    // Add the fractions
    this.actualAnswer = this.addFractions(this.actualFraction1, this.actualFraction2);
    console.log('Sum of actual problem is: ', this.actualAnswer)
    this.generateAlternateAnswers();
    this.numberOfQuestionsAsked++
    console.log('actual questions asked', this.numberOfQuestionsAsked)
  }

  addFractions(fraction1: { numerator: number, denominator: number }, fraction2: { numerator: number, denominator: number }): { numerator: number, denominator: number } {
    console.log('adding fractions...')
    // Calculate the common denominator
    const commonDenominator = fraction1.denominator * fraction2.denominator;
    console.log('commonDenominator', commonDenominator)


    // Calculate the numerators after adjusting for the common denominator
    const adjustedNumerator1 = fraction1.numerator * fraction2.denominator;
    const adjustedNumerator2 = fraction2.numerator * fraction1.denominator;

    // Calculate the sum of the numerators
    const sumNumerator = adjustedNumerator1 + adjustedNumerator2;

    // Simplify the result
    const divisor = this.randomFractionService.gcd(sumNumerator, commonDenominator);
    const simplifiedNumerator = sumNumerator / divisor;
    const simplifiedDenominator = commonDenominator / divisor;

    console.log('simplified fraction', simplifiedNumerator, '/', simplifiedDenominator  )


    return { numerator: simplifiedNumerator, denominator: simplifiedDenominator }; //answer of the sum of the fractions
  }

  gcd(a: number, b: number): number {
    console.log('finding gcd...')
    if (b === 0) {
      return a;
    }
    return this.gcd(b, a % b);
  }
  
  simplifyFraction(numerator: number, denominator: number) {
    const divisor = this.gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  }
  
  sendResults() {
    console.log('sending results to reports page...')
    const dataToSend = {
      topic: this.TOPIC,
      numberset: this.NUMBERSET,
      totalQuestions: this.totalQuestionsToAsk,
      totalCorrect: this.numberOfCorrectAnswers,
    };

    
    this.dataService.setResults(dataToSend)
    console.log('Data sent to ResultsDataService:', dataToSend)

    const { topic, numberset, totalCorrect, totalQuestions } = dataToSend;

    // Navigate to the reports page with the data
    this.router.navigate(['../reports'], {
      state: {
        topic,
        numberset,
        totalCorrect,
        totalQuestions
      }
    }).then(() => {
      // After navigation, save results to the database
      this.dataService.saveResultsToDatabase(topic, numberset, totalCorrect, totalQuestions)
        .subscribe(
          (response: any) => { // Explicitly define the type of 'response'
            console.log('Results saved to database:', response);
            // Optionally, you can handle success response here
          },
          (error: any) => { // Explicitly define the type of 'error'
            console.error('Error saving results to database:', error);
            // Handle error appropriately
          }
        );
    });
  }

  generateAlternateAnswers() {
    console.log('generate an alternate answer function accessed');

    // Clear the answer list before generating new alternate answers
    console.log('Answer list before it has been cleared', this.answerList)
    this.answerList = [];
    console.log('Answer list after it has been cleared: ', this.answerList)

    // Add the correct answer to the list
    this.answerList.push(this.actualAnswer);

    while (this.answerList.length < 6) {
        // Generate a new alternate answer in each iteration
        console.log(this.answerList)
        const alternateFraction1 = this.randomFractionService.generateRandomFraction(this.MIN_NUM1, this.MAX_NUM1, this.MIN_DEM1, this.MAX_DEM1);
        if (alternateFraction1.numerator > alternateFraction1.denominator) {
          const temp = alternateFraction1.numerator;
          alternateFraction1.numerator = alternateFraction1.denominator;
          alternateFraction1.denominator = temp;
        }
    
        const alternateFraction2 = this.randomFractionService.generateRandomFraction(this.MIN_NUM2, this.MAX_NUM2, this.MIN_DEM2, this.MAX_DEM2);
        if (alternateFraction2.numerator > alternateFraction2.denominator) {
          const temp = alternateFraction2.numerator;
          alternateFraction2.numerator = alternateFraction2.denominator;
          alternateFraction2.denominator = temp;
        }
        console.log('AlternateAnswer: Fraction 1', alternateFraction1.numerator, '/', alternateFraction1.denominator);
        console.log('AlternateAnswer: Fraction 1', alternateFraction2.numerator, '/', alternateFraction2.denominator);

        // Add the alternate answer to the list if it's not equal to the correct answer
        const alternateAnswer = this.addFractions(alternateFraction1, alternateFraction2);
        console.log('sum of alternateAnswer fractions', alternateAnswer)
        if (!this.areFractionsEqual(alternateAnswer, this.actualAnswer) && !this.answerList.includes(alternateAnswer)) {
          console.log('Adding alternate answer to the list...')
            this.answerList.push(alternateAnswer);
        }
    }

    // Shuffle the answer list to randomize the order
    this.shuffleAnswerList();

    console.log(this.answerList);
    return this.answerList;
}

  // Function to compare two fractions
  areFractionsEqual(fraction1: { numerator: number, denominator: number }, fraction2: { numerator: number, denominator: number }) {
    return fraction1.numerator === fraction2.numerator && fraction1.denominator === fraction2.denominator;
  }


  shuffleAnswerList() {
    console.log('shuffle answer list function accessed')
    // Fisher-Yates algorithm
    // Picks a random item in the array then swaps with the current iteration
    console.log('unshuffled answer list', this.answerList)
    for (let i = this.answerList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.answerList[i];
      this.answerList[i] = this.answerList[j];
      this.answerList[j] = temp;
    }
    console.log('shuffled answer list', this.answerList)
  }

  // Handle button click to check the answer
  checkAnswer(selectedAnswer: { numerator: number, denominator: number } = { numerator: 0, denominator: 1 }) {
    console.log('check answer function accessed')
    // count the number of attempts to answer the question correctly
    this.numberOfAttempts++
    console.log('number of uniques questions asked', this.numberOfQuestionsAsked)
    console.log(`number of attempts after clicking an answer ${this.numberOfAttempts}`)
    console.log(`number of questions answered correctly is: ${this.numberOfCorrectAnswers}`)

    if (selectedAnswer.numerator === this.actualAnswer.numerator && selectedAnswer.denominator === this.actualAnswer.denominator) {
      // Correct answer
      this.numberOfCorrectAnswers++;
      console.log(`Correct answer selected.`);

    } else {
      // Incorrect answer
      console.log(`incorrect answer selected.`);
    }

    if(this.numberOfQuestionsAsked === this.totalQuestionsToAsk) {
        console.log('send results to results page')
        this.sendResults();

      } else {
        this.generateProblem(); 
      }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/UserService/user.service';
import { DataService } from '../services/DataServices/data.service';
import { RandomWholeNumbersService } from '../services/Calculations/RandomNumbers/random-whole-numbers.service';


@Component({
  selector: 'app-addition-positive-whole-numbers',
  templateUrl: './addition-positive-whole-numbers.component.html',
  styleUrl: './addition-positive-whole-numbers.component.scss'
})
export class AdditionPositiveWholeNumbersComponent {
  TOPIC: string = 'Addition';
  NUMBERSET: string = 'Positive Whole Numbers'
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  MIN_ONE: number = 1;
  MAX_ONE: number = 10;
  MIN_TWO: number = 11;
  MAX_TWO: number = 20;
  answerList: number[] = [];
  numberOfQuestionsAsked: number = 0;     // Counter for questions asked
  totalQuestionsToAsk: number = 3;        // total number of questions to ask
  answer: number = 0;
  expression: string = '';
  numberOfAttempts: number = 0;           // Counter to keep track of the number of times an answer was tried
  numberOfCorrectAnswers: number = 0;     // Counter for correct answers
  alternateAnswer: number = 0;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private randomWholeNumbers: RandomWholeNumbersService,
    private router: Router,
  ) { }

  ngOnInit() {


    this.generateProblem();

  }

  ngAfterViewInit() {
    this.shuffleAnswerList();
    // console.log('answer list accessed in ngAfterViewInit', this.answerList)
  }


  generateProblem(): void {
    console.log('Generate Problem function accessed')

    this.randomNumber1 = this.generateRandomWholeNumbers(this.MIN_ONE, this.MAX_ONE);
    this.randomNumber2 = this.generateRandomWholeNumbers(this.MIN_TWO, this.MAX_TWO);
    this.generateExpression();
    if (this.numberOfQuestionsAsked < this.numberOfQuestionsAsked)
      {
        console.log('Random numbers: ', this.randomNumber1, this.randomNumber2, 'Expression: ',
        this.expression, 'Answer: ', this.randomNumber1 + this.randomNumber2);
        this.shuffleAnswerList();
      }

  }

  generateRandomWholeNumbers(min: number, max: number): number {
    console.log('generate a random whole number function accessed')
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateExpression() {
    console.log('generate an expression function accessed')
    this.answerList = [];

    if (this.numberOfQuestionsAsked < this.totalQuestionsToAsk) {
      this.answer = this.randomNumber1 + this.randomNumber2;

      //clear answer list when a new expression is generated
      this.expression = `${this.randomNumber1} + ${this.randomNumber2}`
      this.generateAlternateAnswers();
      this.numberOfQuestionsAsked++;
      this.numberOfAttempts = 0;
    }
    // if maximum number of problems have already been generated
    else {
      const dataToSend = {
        topic: this.TOPIC,
        numberset: this.NUMBERSET, 
        totalQuestions: this.totalQuestionsToAsk,
        totalCorrect: this.numberOfCorrectAnswers,
      };
    
      this.dataService.setResults(dataToSend)
      console.log('Data sent to ResultsDataService:', dataToSend)
  
     this.sendResults();
      
    }
  }

  sendResults() {
    const dataToSend = {
      topic: this.TOPIC,
      numberset: this.NUMBERSET, 
      totalQuestions: this.totalQuestionsToAsk,
      totalCorrect: this.numberOfCorrectAnswers,
    };
  
    // this.dataService.setResults(dataToSend)
    console.log('Data sent to ResultsDataService:', dataToSend)

    console.log('DATA TO SEND TO REPORTS PAGE:', dataToSend);
  
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
    // add correct answer to the list
    console.log('generate an alternate answer function accessed')
    this.answerList.push(this.answer);

    while (this.answerList.length < 6) {
      // Generate a new alternate answer in each iteration
      const alternateAnswer = this.randomWholeNumbers.generateIntegers(1,
        this.answer + this.randomWholeNumbers.generateIntegers(this.randomWholeNumbers.generateIntegers(1, 9),
          this.randomWholeNumbers.generateIntegers(1, 9)
        )
      );
      // Ensure the alternate answer is different from the correct answer
      if (alternateAnswer !== this.answer) {
        // Ensure the alternate answer is not already in the list
        if (!this.answerList.includes(alternateAnswer)) {
          this.answerList.push(alternateAnswer);
        }
      }
    }
    return this.answerList;
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
  checkAnswer(selectedAnswer: number) {
    console.log('check answer function accessed')
    // count the number of attempts to answer the question correctly
    this.numberOfAttempts++
    console.log('number of uniques questions asked', this.numberOfQuestionsAsked)
    console.log(`number of attempts after clicking an answer ${this.numberOfAttempts}`)
    console.log(`number of questions answered correctly is: ${this.numberOfCorrectAnswers}`)

    if (typeof this.answer === 'number' && selectedAnswer === this.answer) {
      // Correct answer
      this.numberOfCorrectAnswers++;
      console.log(`Correct answer selected.`);

      this.generateProblem();

    } else {
      // Incorrect answer
      if (this.numberOfAttempts < 3 && this.answer != selectedAnswer) {
        console.log(`Attempt ${this.numberOfAttempts}: Try again!`);


      }
      else {
        this.generateProblem();

      }
    }
  }

}

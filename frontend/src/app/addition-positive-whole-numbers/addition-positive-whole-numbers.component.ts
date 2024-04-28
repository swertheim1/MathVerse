import { Component } from '@angular/core';
import { RandomWholeNumbersService } from '../services/Calculations/RandomNumbers/random-whole-numbers.service';

@Component({
  selector: 'app-addition-positive-whole-numbers',
  templateUrl: './addition-positive-whole-numbers.component.html',
  styleUrl: './addition-positive-whole-numbers.component.scss'
})
export class AdditionPositiveWholeNumbersComponent {
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  min_one: number = 0;
  max_one: number = 0;
  min_two: number = 0;
  max_two: number = 0;
  answerList: number [] = [];
  numberOfQuestionsAsked: any;
  totalQuestionsToAsk: any;
  answer: number = 0;
  expression: string = '';
  numberOfAttempts: number = 0;
  numberOfCorrectAnswers: number = 0;
  alternateAnswer: number = 0;

  constructor(
    private randomWholeNumbers: RandomWholeNumbersService
  ) { }


  generateProblem(): void {
    console.log('Generate Problem function accessed')

    this.randomNumber1 = this.randomWholeNumbers.generateIntegers(this.min_one, this.max_one);
    this.randomNumber2 = this.randomWholeNumbers.generateIntegers(this.min_two, this.max_two);
    this.generateExpression();
    console.log('Random numbers: ', this.randomNumber1, this.randomNumber2, 'Expression: ', this.expression, 'Answer: ', this.randomNumber1 + this.randomNumber2)
  }
  generateExpression() {
    console.log('generate an expression function accessed')
    this.answerList = [];

    if (this.numberOfQuestionsAsked < this.totalQuestionsToAsk) {
      this.answer = this.randomNumber1 + this.randomNumber2;

      //clear answer list when a new expression is generated
      this.expression = `${this.randomNumber1} + ${this.randomNumber2}`
      this.generateAlternateAnswers();
      this.shuffleAnswerList();
      this.numberOfQuestionsAsked++;
      this.numberOfAttempts = 0;

    }
    // if maximum number of problems have already been generated
    else {
      const dataToSend = {
        totalQuestions: this.totalQuestionsToAsk,
        totalCorrect: this.numberOfCorrectAnswers,
        totalAsked: this.numberOfQuestionsAsked,
      };
      // this.resultsDataService.setSharedResults(dataToSend)
      // console.log('Data sent to ResultsDataService:', dataToSend)
      // {
      //     this.router.navigate(['../results']);
      // }
    }
  }

  generateAlternateAnswers() {
    // add correct answer to the list
    console.log('generate an alternate answer function accessed')
    this.answerList.push(this.answer);

    for (let i = 0; i < 8; i++) {
      // Generate a new alternate answer in each iteration
      const alternateAnswer = this.randomWholeNumbers.generateIntegers(1,
        this.answer + this.randomWholeNumbers.generateIntegers(this.randomWholeNumbers.generateIntegers(1, 9),
          this.randomWholeNumbers.generateIntegers(1, 9)
        )
      );
      // Ensure that this.answer is a number before comparison, if it is unique and not in the list, add it to the list
      if (this.answer !== this.alternateAnswer && !this.answerList.includes(this.alternateAnswer)) {
        this.answerList.push(this.alternateAnswer);
      }
      else {
        // If the alternate answer is the same as the correct answer or already in the list, decrement i to repeat the iteration
        i--;
      }
    }
    return this.answerList;
  }
  shuffleAnswerList() {
    console.log('shuffle answer list function accessed')
    // Fisher-Yates algorithm
    // Picks a random item in the array then swaps with the current iteration
    for (let i = this.answerList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.answerList[i];
      this.answerList[i] = this.answerList[j];
      this.answerList[j] = temp;
    }
  }

      // Handle button click to check the answer
      checkAnswer(selectedAnswer: number) {
        console.log('check answer function accessed')
        // count the number of attempts to answer the question correctly
        this.numberOfAttempts++
        console.log('number of uniques questions asked', this.numberOfQuestionsAsked)
        console.log(`number of attempts after clicking an answer ${this.numberOfAttempts}`)
        console.log(`number of questions answered correctly is: ${this.numberOfCorrectAnswers}`)

        // if (typeof this.answer === 'number' && selectedAnswer === this.answer) {
        //     // Correct answer
        //     this.numberOfCorrectAnswers++;
        //     console.log(`Correct answer selected.`);
        //     this.showCustomToast(`Correct!`);
        //     this.generateProblem();

        // } else {
        //     // Incorrect answer
        //     if (this.numberOfAttempts < 3 && this.answer != selectedAnswer) {
        //         console.log(`Attempt ${this.numberOfAttempts}: Try again!`);
        //         this.showCustomToast(`Attempt ${this.numberOfAttempts}: Incorrect. Try again!`);

        //     }
        //     else {
        //         this.showCustomToast(`Maximum Number of attempts was tried. The correct answer was ${this.answer}.`);
        //         this.generateProblem();

        //     }
        // }
    }

}

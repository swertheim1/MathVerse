import { Component } from '@angular/core';
import { DataService } from '../services/DataServices/data.service';
import { UserService } from '../services/UserService/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  topic: string = '';
  numberset: string | null = '';
  grade_level: string | null = '';
  user_id: number | null = 0;
  questions: number = 0;
  correct: number = 0;
  percentCorrect: number = 0;
  statisticsData: any [] = [];

  reportData: {
    topic: string ,
    numberset: string,
    totalQuestions: number,
    totalCorrect: number
  } | null = null ;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {
    console.log("ReportsComponent constructor");
   }
   results: any;
   ngOnInit() {
   
    this.user_id = this.userService.getUserIdFromLocalStorage();
    this.results = this.dataService.getResults();
    console.log('Results in ResultsPage:', this.results);
    this.topic = this.results.topic;
    this.numberset = this.results.numberset;
    this.questions = this.results.totalQuestions;
    this.correct = this.results.totalCorrect;
    this.percentCorrect = parseFloat((this.correct / this.questions * 100).toFixed(2));
    
    if (this.user_id !== null) {
      this.dataService.getResultsFromDatabase(this.user_id).subscribe(dataSet => {
        console.log(dataSet)
        this.statisticsData = this.dataService.calculateRolledUpStatistics(dataSet);
        console.log("this.statisticsData",  this.statisticsData);
        this.statisticsData.forEach(stat => {
          stat.accuracy = parseFloat(((stat.number_correct / stat.number_of_questions) * 100).toFixed(2));
        });
  
      });

    } else {
      console.log('user_id not available.')
    }

    


  }
}  
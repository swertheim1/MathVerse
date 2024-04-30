import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from '../services/DataServices/data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  topic: string = '';
  numberset: string = '';
  questions: number = 0;
  correct: number = 0;
  percentCorrect: number = 0;

  reportData: {
    topic: string ,
    numberset: string,
    totalQuestions: number,
    totalCorrect: number
  } | null = null ;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {
    console.log("ReportsComponent constructor");
   }
   results: any;
   ngOnInit() {
    this.results = this.dataService.getResults();
    console.log('Results in ResultsPage:', this.results);
    this.topic = this.results.topic;
    this.numberset = this.results.numberset;
    this.questions = this.results.totalQuestions;
    this.correct = this.results.totalCorrect;
    this.percentCorrect = parseFloat((this.correct / this.questions * 100).toFixed(2));
    

    console.log(this.topic, this.numberset, this.questions, this.correct, new Date().toISOString())


    console.log("ReportsComponent ngOnInit start", new Date().toISOString());
    console.log("Initial reportData:", this.reportData, new Date().toISOString());

  
    // Check if the ReportsComponent is being initialized
    console.log("The reports page is being initialized");
  
    // Log the initial value of reportData
    console.log("Initial reportData:", this.reportData);
  
    // Check if navigation extras state is available and log its contents
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.reportData = navigation.extras.state['data'];
      console.log('Initial reportData from navigation extras:', this.reportData);
    } else {
      console.log('No navigation extras state found.');
    }
  
    // Check if state is available and log its contents
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      const { topic, numberset, totalCorrect, totalQuestions } = state;
      console.log('Navigation Extras State:', state);
      console.log('Extracted data:', topic, numberset, totalCorrect, totalQuestions);
      console.log('Assigned reportData:', this.reportData, new Date().toISOString());
      
    } else {
      console.log('No state found in getCurrentNavigation extras.');
    }
  
    // Subscribe to router events separately
    this.subscribeToRouterEvents();
  }
  
  private subscribeToRouterEvents() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.reportData = navigation.extras.state['data'];
        console.log('navigation: ', navigation.extras.state);
      } else {
        console.log('No navigation extras state found in router events subscription.');
      }
    });
    
  console.log("ReportsComponent ngOnInit end", new Date().toISOString());
  }
}  
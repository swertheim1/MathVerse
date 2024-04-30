import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  // topic: string = '';
  // numberset: string = '';
  // numberCorrect:  number = 0;
  numberOfQuestions:  number = 0;
  reportData: {
    topic: string ,
    numberset: string,
    totalQuestions: number,
    totalCorrect: number
  } | null = null ;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    console.log("ReportsComponent constructor");
   }

  ngOnInit() {
    console.log("ReportsComponent ngOnInit");
    console.log("The reports page has been initialized")
    console.log("Initial reportData:", this.reportData);
   
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const navigation = this.router.getCurrentNavigation();
         
        if (navigation && navigation.extras && navigation.extras.state) {
          this.reportData = navigation.extras.state['data'];
          console.log('navigation: ', navigation.extras.state)     
          console.log('Object reportData: ', this.reportData)  
      }
      // this.cdr.detectChanges(); // Force change detection
    });
  }
}
// import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { DataService } from '../services/data.service';
// import { Router } from '@angular/router'
// import { ActivatedRoute } from '@angular/router';
// import { NgZone } from '@angular/core';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],

})

export class TopicsComponent {
  constructor (private httpClient: HttpClient) {}
  // email: string = '';
  // password: string = '';
  // gradeLevel: string = '';
  // topics: string [] = [];

  // constructor(private router: Router, private route: ActivatedRoute, private ngZone: NgZone) {}

 
}

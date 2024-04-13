import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/TokenServices/token.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  message: string | null = null;
  topics: string[] = []; // Corrected the type to string[]

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // Assuming getCachedTopics() returns a string[]
    console.log("topics page has initialized");
    this.topics = this.tokenService.getCachedTopics(); // Assign the topics directly
    console.log(this.topics);
  }

}
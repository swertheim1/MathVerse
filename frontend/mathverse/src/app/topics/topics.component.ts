import { HttpClient, HttpResponse } from '@angular/common/http';
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
  topics: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  
  ngOnInit(): void {
    // Retrieve the message from query parameters
    this.message = this.route.snapshot.queryParamMap.get('message');

    // Fetch topics data
    this.tokenService.getTopics()?.subscribe(
      (response: HttpResponse<any>) => {
        if (response) {
          const statusCode = response.status;
          if (statusCode === 304) {
            console.log('Resource not modified (304)');
            // Use cached data
            this.topics = this.tokenService.getCachedTopics(); // Get cached topics
          } else {
            console.log('Resource updated (200)');
            // Handle new data
            this.topics = response.body; // Assuming topics are in the response body
            // Cache the new topics
            this.tokenService.cacheTopics(this.topics);
          }
        } else {
          console.error('Response object is null.');
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}



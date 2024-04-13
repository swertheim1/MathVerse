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
    // Fetch topics data
    const cachedTopics = this.tokenService.getCachedTopics();
    console.log('Fetching Cached topics', cachedTopics)
    
  }
  
  getTopics() {
  this.tokenService.getTopics()?.subscribe(
    (response: any) => {
      // console.log('getting topics', this.tokenService.getTopics());
      if (response) {
        const statusCode = response.status;
        if (statusCode === 304) {
          console.log('Resource not modified (304)');
          // Use cached data
          const retreivedTopics = this.tokenService.getCachedTopics(); // Get cached topics
          console.log('CACHED topics: ', this.topics);
          this.getTopicsImagePath(this.topics);
        } else {
          console.log('Resource updated (200)');
          // Handle new data
          this.topics = response.body; // Assuming topics are in the response body
          // Cache the new topics
          this.tokenService.cacheTopics(this.topics);
          this.getTopicsImagePath(this.topics);
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

  getTopicsImagePath(topics: string | any[])  {
    console.log('Received topics:', topics);

    const topicPaths: string[]  = [];
    
    // get list of images to display on the topics page based on the 
    for (let i = 0; i < topics.length; i++)
      {
        const path = `assets/images/${topics[i]}.png`;
        topicPaths.push(path);
        console.log('Topic path:', path);
      }
      console.log('Generated topic paths:', topicPaths );

      return topicPaths;
  }
}



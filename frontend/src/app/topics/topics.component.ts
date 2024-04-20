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
  
  assignImage(topic_list: []): { name: string, imageUrl: string }[] {
    const image_array = [];
  
    // Example topic
    
    for (const topic of topic_list)
    switch (topic) {
      case 'Addition':
        const additionTopic = {
          name: topic,
          imageUrl: '../assets/images/plus3@300x.png'
        };
        image_array.push(additionTopic);
        break;
  
        case 'Subtraction':
          const subtractionTopic = {
            name: topic,
            imageUrl: '../assets/images/minus3@300x.png'
          };
          image_array.push(subtractionTopic);
          break;

          case 'Multiplication':
            const multiplicationTopic = {
              name: topic,
              imageUrl: '../assets/images/minus3@300x.png'
            };
            image_array.push(multiplicationTopic);
            break;
  
      default:
        // Default case if topic doesn't match any specific case
        break;
    }
  
    return image_array;
  }

  }

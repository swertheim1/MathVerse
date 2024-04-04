import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})


export class TopicsComponent implements OnInit {
  topics: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Make HTTP GET request to fetch topics data from backend
    this.http.get<any[]>('/mathverse/topics').subscribe({
      next: response => {
        // Assign the fetched topics data to the 'topics' property
        this.topics = response;
        console.log(this.topics)
      },
      error: error => {
        // Handle error if HTTP request fails
        console.error('Error fetching topics:', error);
      }
    })
  }
}

// import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],

})

export class TopicsComponent {
  message: string | null;

  constructor(private route: ActivatedRoute) {
    // Retrieve the message from query parameters
    this.message = this.route.snapshot.queryParamMap.get('message');
  }
}
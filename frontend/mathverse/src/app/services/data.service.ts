import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  private topicsSubject = new BehaviorSubject<any[]>([]);
  public topics$ = this.topicsSubject.asObservable();

  fetchTopics(): void {
    this.http.get<any[]>('data-url').subscribe(
      (topics) => {
        this.topicsSubject.next(topics);
      },
      (error) => {
        console.error('Error fetching topics:', error);
      }
    );
  }
}
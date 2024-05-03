import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../UserService/user.service';

interface RolledUpStatistics {
  topic: string;
  numberset: string;
  number_correct: number;
  number_of_questions: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  numbersets_list: any;
  topics_list: any;
  
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,

  ) { }

  private topicsSubject = new BehaviorSubject<any[]>([]);
  public topics$ = this.topicsSubject.asObservable();

  // Send results to database
  // Need to include user_id, from local storage
  saveResultsToDatabase(
    topic: string,
    numberset: string,
    totalCorrect: number,
    totalQuestions: number
  ): Observable<any> {
    const user_id = this.userService.getUserIdFromLocalStorage();
    const grade_level = this.userService.getGradeLevelFromLocalStorage();
    const saveResultsUrl = `${this.apiUrl}/saveResults`;
    const data = { user_id, grade_level, topic, numberset, totalCorrect, totalQuestions };
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    // Return the observable created by the HttpClient's post method
    return this.httpClient.post(saveResultsUrl, data, { headers });
  }

  getResultsFromDatabase(user_id: number): Observable<any[]> {
    console.log("Get Results from Database has been accessed");
    const authToken = localStorage.getItem('authToken');
    
    
    if (!authToken) {
      console.error('Authentication token not found');
      return of([]); // return an empty array if authToken not found 
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json'); // Set content type to JSON
    
    // Prepare request body with grade_level
    let params = new HttpParams();
    if (user_id !== null) {
      params = params.set('user_id', user_id.toString());
    }
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/getResults`,  { headers, params })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  calculateRolledUpStatistics(results: any[]): RolledUpStatistics[] {
    console.log("Calculate Rolled up Statistics has been accessed")
    const rolledUpStatistics: RolledUpStatistics[] = [];
    results.forEach(result => {
      // console.log("Processing result:", result);
      const { topic_name, numberset_name, number_correct, number_of_questions } = result;
  
      // Check if the statistics already exist for this topic and numberset
      const existingStatisticIndex = rolledUpStatistics.findIndex(statistic => statistic.topic === topic_name && statistic.numberset === numberset_name);
  
      if (existingStatisticIndex !== -1) {
        // If the statistics exist, update them
        rolledUpStatistics[existingStatisticIndex].number_correct += number_correct;
        rolledUpStatistics[existingStatisticIndex].number_of_questions += number_of_questions;
      } else {
        // If the statistics don't exist, add them
        rolledUpStatistics.push({
          topic: topic_name,
          numberset: numberset_name,
          number_correct,
          number_of_questions
        });
      }
    });
    console.log("Returning observable with results");
    return rolledUpStatistics;
  }
  
  // Get from local storage or from server if not in local storage
  getTopics(): Observable<any[]> {
    // Retrieve authentication token from local storage
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Authentication token not found');
      console.log("User needs to log back in.")
      return of([]);
    }

    // get grade_level from user service
    const grade_level: string | null = this.userService.getGradeLevelFromLocalStorage()
    if (grade_level !== null) {
      // Prepare request headers with authentication token 
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      const params = new HttpParams().set('grade_level', grade_level);

      // Make HTTP GET request to fetch topics
      return this.httpClient.get<any[]>(`${this.apiUrl}/topics`, { headers, params })
        .pipe(
          tap((topics: any) => {
            // store topics directly in local storage
            localStorage.setItem('topics_list', JSON.stringify(topics));
            // store user_id directly in local storage
            console.log('Topics added to local storage');
          }),
          catchError(error => {
            console.error('Error fetching topics:', error);
            return of([]); // Return an empty array in case of error
          })
        );
    } else {
      console.error('User needs to log back in');
      return of([]); // Grade Level not available so return an empty string
    }
  }

  // Get from local storage or from server if not in local storage
  getNumbersets(): Observable<any[]> {
    // Retrieve authentication token from local storage
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Authentication token not found');
      return of([]); // Return empty array if authentication token is not found
    }

    // get grade_level from user service
    const grade_level: string | null = this.userService.getGradeLevelFromLocalStorage()
    if (grade_level !== null) {
      // Prepare request headers with authentication token 
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      const params = new HttpParams().set('grade_level', grade_level);

      // Make HTTP GET request to fetch numbersets
      return this.httpClient.get<any[]>(`${this.apiUrl}/numbersets`, { headers, params })
        .pipe(
          tap((numbersets: any) => {
            // store numbersets directly in local storage
            localStorage.setItem('numbersets_list', JSON.stringify(numbersets));
            console.log('Numbersets added to local storage');
          }),
          catchError(error => {
            console.error('Error fetching numbersets:', error);
            return of([]); // Return an empty array in case of error
          })
        );
    } else {
      console.error('User needs to log back in');
      return of([]); // Grade Level not available so return an empty string
    }
  }
  
  private results: any;
  setResults(results: any):  void {
    this.results = results;
  }

  getResults()
  {
    return this.results;
  }
}
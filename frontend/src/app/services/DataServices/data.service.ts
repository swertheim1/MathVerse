import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../TokenServices/token.service';
import { UserService } from '../UserService/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;
  numbersets_list: any;
  topics_list: any;
  lastModified: string | null;
  etag: string | null;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private userService: UserService

  ) {
    this.lastModified = null;
    this.etag = null;
  }

  private topicsSubject = new BehaviorSubject<any[]>([]);
  public topics$ = this.topicsSubject.asObservable();


  // Return the cached topics
  getTopics(): Observable<any[]> {
    // Retrieve authentication token from local storage
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Authentication token not found');
      return of([]); // Return empty array if authentication token is not found
    }
    
    // get grade_level from user service
    const grade_level: string | null = this.userService.getGradeLevel()
    if (grade_level !== null) {
      // Prepare request headers with authentication token 
      const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded'); 

      const params = new HttpParams().set('grade_level', grade_level );
      // Handle the case where gradeLevel is null
 
    // Make HTTP GET request to fetch topics
    return this.httpClient.get<any[]>(`${this.apiUrl}/topics`, { headers, params })
    .pipe(
      tap((topics: any) => {
        // store topics directly in local storage
        localStorage.setItem('topics_list', JSON.stringify(topics));
        console.log('Topics added to local storage');
      }),
    );
    } else {
      console.error('User needs to log back in');
      return of([]); // Grade Level not available so return an empty string
    }

      catchError(error => {
        console.error('Error fetching topics:', error);
        return of([]); // Return an empty array in case of error
      })
    
  }

  getNumbersets(): Observable<any[]> {
    const headers = new HttpHeaders();
    return this.httpClient.get<any[]>(`${this.apiUrl}/numbersets`, { headers }).pipe(
      tap((response: any) => {
        // Access data from response body
        const numbersets: any[] = response.body;
        localStorage.setItem('numbersets', JSON.stringify(numbersets));
        console.log('Numbersets added to local storage');

      }),
      catchError(error => {
        console.error('Error fetching numbersets:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
}
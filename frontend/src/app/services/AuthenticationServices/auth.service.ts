import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../TokenServices/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  topics_list: any[] | null = null;
  numbersets_list: any[] | null = null;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) { }

  login(credentials: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, credentials, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Login Response:', response);
          const authToken = response.headers.get('Authorization');
          if (authToken) {
            this.tokenService.setToken(authToken);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    // Log the error to console or analytics service
    console.error('Error in AuthService:', error);

    // Determine the type of error and log relevant information
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error('Server-side error occurred:', error);
      const statusCode = error.status;
      console.error('Status code:', statusCode); // Log status code

      // Log error message from server, if available
      if (error.error && error.error.message) {
        console.error('Error message:', error.error.message);
      }
    }

    // Return an observable with a user-friendly error message
    return throwError('An unexpected error occurred. Please try again later.');
  }
}

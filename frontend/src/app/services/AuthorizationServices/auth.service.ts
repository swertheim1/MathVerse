import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
    console.debug('AUTH SERVICE LOGIN CALLED')
    console.debug('AUTH SERVICE API URL:', this.apiUrl);
    return this.httpClient.post<HttpResponse<any>>(`${this.apiUrl}/login`, credentials, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getHeaders(token: string): Observable<any> {
    console.debug('Getting headers with token:', token);
    const httpHeaders = new HttpHeaders({
      'Authorization': token
    });
    return this.httpClient.get(`${this.apiUrl}/user-data`, { headers: httpHeaders })
      .pipe(
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

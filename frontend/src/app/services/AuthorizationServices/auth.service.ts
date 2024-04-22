import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
    console.log('API URL:', this.apiUrl); 
    return this.httpClient.post<HttpResponse<any>>(`${this.apiUrl}/login`, credentials, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  public getHeaders(token: string): Observable<any> {
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

    // Determine the type of error
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error occurred:', error.error.message);
      return throwError('An unexpected client-side error occurred. Please try again later.');
    } else {
      // Server-side error
      console.error('Server-side error occurred:', error);
      const statusCode = error.status;
      if (statusCode === 401) {
        // Unauthorized error
        return throwError('Unauthorized access. Please log in again.');
      } else if (statusCode === 404) {
        // Resource not found error
        return throwError('The requested resource was not found.');
      } else {
        // Other server-side errors
        return throwError('An unexpected server-side error occurred. Please try again later.');
      }
    }
  }
}
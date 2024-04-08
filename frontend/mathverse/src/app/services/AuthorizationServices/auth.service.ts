import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Update the base URL here
  
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials, { 
      observe: 'response' 
    });
  }
  
  public getHeaders(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': token
    });
    return this.httpClient.get(`${this.baseUrl}/user-data`, { 
      headers: httpHeaders
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  
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
    return this.httpClient.get(`${this.baseUrl}/login`, { 
      headers: {
        'Content-Type': 'application/json',
        'Origin': environment.apiUrl
      } 
    });
  }
}
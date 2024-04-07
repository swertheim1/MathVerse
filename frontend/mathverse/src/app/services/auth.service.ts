// In a service file, such as auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient,) {}
  private baseUrl = 'http://localhost:3000'; // Update the base URL here
  
  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class SignupService {
  private apiUrl = environment.apiUrl;
  

  constructor(
    private http: HttpClient
  ) {}
  
  saveSignupData(signupData: any) {
    const signupUrl = `${this.apiUrl}/signup`;
    console.log('SIGNUP API URL:', `${this.apiUrl}/signup`); 
    console.log('Save Signup Function called');
    return this.http.post(signupUrl, signupData, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': this.apiUrl
      }
    });
  }
}
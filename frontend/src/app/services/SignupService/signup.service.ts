import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'http://localhost:3000/signup';

  constructor(private http: HttpClient) { }

  saveSignupData(signupData: any) {
    console.log('Save Signup Function called')
    return this.http.post(this.apiUrl, signupData);
  }
}
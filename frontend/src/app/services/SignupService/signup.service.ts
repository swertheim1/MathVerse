import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = environment.apiUrl;
  // console.log('apiUrl');

  constructor(
    private http: HttpClient
  ) {}

  saveSignupData(signupData: any) {
    console.log('Save Signup Function called')
    return this.http.post(this.apiUrl, signupData);
  }
}
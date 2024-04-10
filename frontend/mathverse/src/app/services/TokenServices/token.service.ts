import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: string | null = null;
  decodedToken!: { [key: string]: string };
  
  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.token = token;
    if (token)
    this.cookieService.set('token', token);
    console.log('Token saved successfully:', token);
    this.decodeToken();
  }
  
  decodeToken() {
    if (this.token) {
      console.log(`this.token, ${this.token}`)
      this.decodedToken = jwtDecode(this.token);
      console.log("grade_level", this.decodedToken['grade_level'])
      console.log("email", this.decodedToken['email'])
    
    }
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    }
    // Return empty string if cookie token is null or undefined
    return this.cookieService.get('token') || ''; 
  }

  getGradeLevel() {
    if (this.decodedToken) {
      console.log(this.decodedToken['grade_level'])
      return this.decodedToken ? this.decodedToken['grade_level'] : null;
    }
    return null;
  }

  getEmail() {
    this.decodeToken();
    console.log(this.decodedToken['email'])
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? parseInt(this.decodedToken['exp']) : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    const currentTime = Date.now();
    const tokenExpired = expiryTime !== null && (expiryTime * 1000) < currentTime;
    if (expiryTime) {
      return (expiryTime * 1000) < Date.now();
    }
    return false;
  }
  
  handleError(error: any): void {
    console.error('An error occurred while saving the token:', error);
    // Perform any additional error handling actions, such as displaying an error message to the user
  }
}
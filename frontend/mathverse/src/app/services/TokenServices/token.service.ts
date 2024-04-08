import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import  { jwtDecode as jwt_decode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: string | null = null;
  decodedToken!: { [key: string]: string };
  
  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.token = token;
    this.cookieService.set('token', token);
    console.log('Token saved successfully:', token);
    this.decodeToken();
  }
  
  decodeToken() {
    if (this.token) {
      console.log(`this.token, ${this.token}`)
      this.decodedToken = jwt_decode(this.token);
    }
  }

  getToken(): String {
    if (this.token) {
      return this.token;
    }
    return this.cookieService.get('token') || ''; // Return empty string if cookie token is null or undefined
  }

  getUser() {
    if (this.decodedToken) {
      return this.decodedToken ? this.decodedToken['displayName'] : null;
    }
    return null;
  }

  getEmailId() {
    this.decodeToken();
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
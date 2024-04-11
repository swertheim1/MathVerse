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
      this.cookieService.set('authToken', token); 
    console.log('Token saved successfully:', token);
    this.decodeToken();
  }
  
  decodeToken() {
    if (this.token) {
      console.log(`this.token, ${this.token}`)
      this.decodedToken = jwtDecode(this.token);
      console.log("grade_level", this.decodedToken['grade_level']);
      console.log("email", this.decodedToken['email']);
      console.log("exp", this.decodedToken['exp']);
      console.log("iat", this.decodedToken['iat']);
      
    }
  }

  getToken(): string {
    const tokenFromProperty = this.token || ''; 
    const tokenFromCookie = this.cookieService.get('authToken') || ''; 
    return tokenFromProperty || tokenFromCookie || '';
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
    console.log('Decoded token:', this.decodedToken);
    const expiryTime = this.decodedToken ? parseInt(this.decodedToken['exp']) * 1000 : null;
    console.log('Expiry time:', expiryTime);
    return expiryTime;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime !== null) {
      console.log('is expiry time expired? ', expiryTime * 1000 < Date.now())
      return expiryTime * 1000 < Date.now();
    } 
    console.log('Token is invalid because expiryTime is null');
    return true; // Token is considered expired if expiryTime is null
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      const currentTime = Date.now();
      console.log(`The current time is ${currentTime} The expirationTime time is ${expirationTime} `);
      console.log(`current time is less than expiration time? , ${currentTime < expirationTime}`);
      return currentTime < expirationTime; // if true, token is valid
    } catch (error) {
      console.error('Token decoding error:', error);
      return false;
    }
  }
  
  handleError(error: any): void {
    console.error('An error occurred while saving the token:', error);
    // Perform any additional error handling actions, such as displaying an error message to the user
  }
}
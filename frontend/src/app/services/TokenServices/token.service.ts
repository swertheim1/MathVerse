import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: string | null = null;
  decodedToken!: { [key: string]: string };
  private cachedTopics: any[] = [];
  private cachedNumbersets: any[] = [];
  
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {}

  setToken(token: string): void {
    console.log('SetToken has been called');
    this.token = token;
    if (token)
      this.cookieService.set('authToken', token); 
    
    this.decodeToken();
  }
  
  decodeToken() {
    console.log('DecodeToken has been called');
    if (this.token) {
      console.log(`this.token, ${this.token}`)
      this.decodedToken = jwtDecode(this.token);
    }
  }

  getToken(): string {
    const tokenFromProperty = this.token || ''; 
    const tokenFromCookie = this.cookieService.get('authToken') || ''; 
    return tokenFromProperty || tokenFromCookie || '';
}

  getGradeLevel() {
    console.log('Get Grade level has been called');
    if (this.decodedToken) {
      console.log(this.decodedToken['grade_level'])
      return this.decodedToken ? this.decodedToken['grade_level'] : null;
    }
    return null;
  }

  getEmail() {
    console.log('Get Email has been called');
    this.decodeToken();
    if (this.decodedToken && this.decodedToken['email']) {
      console.log(this.decodedToken['email']);
      return this.decodedToken['email'];
    } else {
      console.error('Email not found in decoded token.');
      return null; // or handle it in a way appropriate for your application
    }
  }

  cacheTopics(topics: any[]): void {
    localStorage.setItem('cachedTopics', JSON.stringify(topics));
    console.log('CacheTopics has been called');
    console.log("topics being cached", topics);
    this.cachedTopics = topics;
  }

  getCachedTopics(): any[] {
    console.log(`GetCached Topics has been called:  ${this.cachedTopics}`);
    const cachedTopicsString = localStorage.getItem('cachedTopics');
    return cachedTopicsString ? JSON.parse(cachedTopicsString) : [];
  }

  getTopics(): Observable<any> {
    console.log('GetTopics has been called');
    this.decodeToken();
    const topics = this.decodedToken && this.decodedToken['topics'];
    if (Array.isArray(topics)) {
      console.log('TOPICS from GET TOPICS:', topics);
      this.cacheTopics(topics);
      return of(topics);
    } else {
      console.error('Topics property not found or is not an array in decoded token.');
      return of(null);
    }
  }

  cacheNumbersets(numbersets: any[]): void {
    localStorage.setItem('cacheNumbersets', JSON.stringify(numbersets));
    console.log('CacheNumbersets has been called');
    console.log("Numbersets being cached", numbersets);
    this.cachedNumbersets = numbersets;
  }

  getCachedNumbersets(): any[] {
    console.log(`GetCachedNumbersets has been called:  ${this.cacheNumbersets}`);
    const cachedNumbersetsString = localStorage.getItem('cacheNumbersets');
    return cachedNumbersetsString ? JSON.parse(cachedNumbersetsString) : [];
  }

  getNumbersets(): Observable<any> {
    console.log('GetNumbersets has been called');
    this.decodeToken();
    const numbersets = this.decodedToken && this.decodedToken['numbersets'];
    if (Array.isArray(numbersets)) {
      console.log('NUMBERSETS from GET NUMBERSETS:', numbersets);
      this.cacheTopics(numbersets);
      return of(numbersets);
    } else {
      console.error('Numbersets property not found or is not an array in decoded token.');
      return of(null);
    }
  }

  getExpiryTime() {
    console.log('getExpiryTime has been called');
    this.decodeToken();
    console.log('Decoded token:', this.decodedToken);
    const expiryTime = this.decodedToken ? parseInt(this.decodedToken['exp']) * 1000 : null;
    console.log('Expiry time:', expiryTime);
    return expiryTime;
  }

  isTokenExpired(): boolean {
    console.log('IsTokenExpired has been called');
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime !== null) {
      console.log('is expiry time expired? ', expiryTime * 1000 < Date.now())
      return expiryTime * 1000 < Date.now();
    } 
    console.log('Token is invalid because expiryTime is null');
    return true; // Token is considered expired if expiryTime is null
  }

  isTokenValid(token: string): boolean {
    console.log('IsTokenValid has been called');
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
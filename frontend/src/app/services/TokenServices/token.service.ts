import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: string | null = null;
  decodedToken!: { [key: string]: string };
  private cachedTopics: any[] = [];
  private cachedNumbersets: any[] = [];
  private apiUrl = environment.apiUrl;

  constructor(
    private cookieService: CookieService,

  ) { }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  setToken(authToken: string) {
    localStorage.setItem('authToken', authToken);
    console.log("retrieving token from storage", localStorage.getItem('authToken'))
  }

  getToken(): string {
    // Retrieve token from local storage
    const token = localStorage.getItem('authToken');

    // If token is null, throw an error or handle it accordingly
    if (token === null) {
      throw new Error('Token is not found in local storage.');
    }

    // Return the token
    return token;
  }
  
    parseToken(authToken: string): string {
      if (authToken && authToken.startsWith('Bearer')) {
        const parsedToken = authToken.split(' ');
        console.log('Parsed token:', parsedToken[1]);
        return parsedToken[1];
      } else {
        console.error('Invalid token format');
        return ''; // Return empty string if token format is invalid
      }
    }

  getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return null; // Token is invalid or doesn't have an expiration date
    }
    const expirationDate = new Date(0); // Start date (epoch time)
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate;
  }

  isTokenNotExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      const currentTime = Date.now();
      console.log(`Current time: ${new Date(currentTime).toISOString()}`);
      console.log(`Expiration time: ${new Date(expirationTime).toISOString()}`);
      console.log('currentTime < expirationTime', currentTime < expirationTime)
      return currentTime < expirationTime; // Token is considered valid if current time is less than expiration time
    } catch (error) {
      console.error('Token decoding error:', error);
      return false; // Treat decoding errors as token being expired
    }
  }


}
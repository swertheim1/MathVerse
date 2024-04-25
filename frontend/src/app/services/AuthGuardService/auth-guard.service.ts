import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../TokenServices/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private TokenService: TokenService) { }

  canActivate(): boolean {
    // Check if the user is authenticated 
    const token = this.TokenService.getToken(); 
    const isTokenValid = this.TokenService.isTokenValid(token); 
    
    
    if (isTokenValid) {
      // User's token is valid - allow access to the route
      console.log('Token is valid - routing to topics page.');
      return true;
    } else {
      // Redirect to login page with a message
      console.log('Token is not valid - routing back to login page');
      this.router.navigate(['/login'], {
        queryParams: { message: 'Please log in to access topics.' },
      });
      return false;
    }
  }
}
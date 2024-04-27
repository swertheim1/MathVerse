import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../TokenServices/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router, 
    private tokenService: TokenService
  ) { }

  canActivate(): boolean {
    // Check if the user is authenticated 
    
    // Retrieve the token from the AuthService
    const token = this.tokenService.getToken();
    
    // Check if the token is expired
    const tokenNotExpired = this.tokenService.isTokenNotExpired(token);
   
    if (tokenNotExpired) {
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
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
    // Remove token from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('numbersets_list');
    localStorage.removeItem('topics_list');

    // Redirect user to login page
    this.router.navigateByUrl('/login');
  }
}
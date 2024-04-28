import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { LogoutService } from '../services/Logout/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  constructor (
    private router: Router,
    private logoutService: LogoutService
  ) {
    this.router = router;
  }
  // Method to handle user logout
  onLogoutClick(): void {
    // Clear the authentication token
    this.logoutService.logout();
    window.location.href = '/login';
  }
 }


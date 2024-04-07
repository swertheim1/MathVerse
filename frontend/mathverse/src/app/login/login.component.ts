import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  login(email: string, password: string) {
    // You don't need to hardcode the credentials here
    // Get the email and password from the form inputs
    const credentials = { email, password };
    console.log('Login button clicked');

    this.authService.login(credentials)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          // Handle response (e.g., store token, redirect)
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}


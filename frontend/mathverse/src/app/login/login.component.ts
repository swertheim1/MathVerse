import { Component } from '@angular/core';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/TokenServices/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(email: string, password: string) {
    const credentials = { email, password };
    console.log('Login button clicked');

    this.authService.login(credentials).subscribe(
      (res: HttpResponse<any>) => {
        console.log('res.body', res.body);
        console.log('res.headers', res.headers);
        console.log(res.headers.keys());
        console.log('res.headers.getAll(Authorization)', res.headers.getAll('Authorization'))
        
        // Handle successful login response
      

      },
      (error: any) => {
        console.error('Error', error );
        // Handle login error
      }
    );
  }

  saveTokenToCookie(token: string) {
    this.cookieService.set('authToken', token);
  }
}
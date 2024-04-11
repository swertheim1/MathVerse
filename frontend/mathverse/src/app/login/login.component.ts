import { Component } from '@angular/core';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/TokenServices/token.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormsModule]
})

export class LoginComponent {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  login(email: string, password: string) {
    const credentials = { email, password };
    console.log('Login button clicked');

    this.authService.login(credentials).subscribe(
      (res: HttpResponse<any>) => {
        console.log('res.headers.getAll(Authorization)', res.headers.getAll('Authorization'))

        // Handle successful login response
        const tokenArray = res.headers.getAll("Authorization");
        if (tokenArray && tokenArray.length > 0) {
          const token = tokenArray[0]; // Get the first element
          this.tokenService.setToken(token);
          this.saveTokenToCookie(token);
        }
          console.log("User being redirect to topics page")
          this.router.navigate(['/topics']);

      },
      (error: any) => {
        console.error('Error', error);
        // Handle login error
      }
    );
  }

  saveTokenToCookie(token: string) {
    this.cookieService.set('authToken', token);
    console.log('token saved to cookie')
  }
}
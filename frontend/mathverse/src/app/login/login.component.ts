import { Component } from '@angular/core';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/TokenServices/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('LoginFormComponent initialized.');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  
  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log("Form is valid. Submitting:", email, password);
  
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
            
            // Decode the token and cache topics after successfully setting the token
            this.tokenService.decodeToken();
            this.tokenService.getTopics().subscribe((topics: any[]) => {
              this.tokenService.cacheTopics(topics);
            });
  
            console.log("User being redirected to topics page")
            this.router.navigate(['/topics']);
          }
        },
        (error: any) => {
          console.error('Error', error);
          // Handle login error
        }
      );
    } else {
      console.log("Form is invalid. Please fill in all fields correctly.");
    }
  }

  saveTokenToCookie(token: string) {
    this.cookieService.set('authToken', token);
    console.log('token saved to cookie')
  }

  forgotPasswordClick(): void {
    // Implement your logic here:
    // Show a modal, navigate to a password reset page, etc.
    console.log("Forgot Password button clicked!");
    console.log("User being redirected to topics page")
    this.router.navigate(['/signup']);
  }

  needToSignUpClick(): void {
    console.log("Need to register button clicked")
  }
}

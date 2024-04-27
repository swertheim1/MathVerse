import { Component } from '@angular/core';
import { AuthService } from '../services/AuthenticationServices/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  public router: Router;
  private apiUrl = environment.apiUrl;
  gradeLevel: string | null = null; 
  
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    router: Router,
    private fb: FormBuilder
    
  ) { 
    // Log when constructor is called
    console.log('Login App Constructor called'); 
    
    this.router = router;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const credentials = { email, password };

      this.authService.login(credentials).subscribe(
        (res: any) => {
          console.log('Login successful');
          this.router.navigate(['/topics']);
        },
        (error: any) => {
          console.error('Login failed. Error:', error);
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
  }

  needToSignUpClick(): void {
    console.log("Need to register button clicked")
    this.router.navigate(['/signup']);
  }
}

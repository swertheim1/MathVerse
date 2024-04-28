import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../services/AuthenticationServices/auth.service';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  [x: string]: any;
  loginForm!: FormGroup;
  public router: Router;
  gradeLevel: string | null = null; 
  errorMessage: string = '';
  
  constructor(
    private authService: AuthService,
    router: Router,
    private fb: FormBuilder,
      
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
      const errorMessage = "Form is invalid. Please fill in all fields correctly.";
    }
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

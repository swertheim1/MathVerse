import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() loginClicked: EventEmitter<{ email: string, password: string }> = new EventEmitter<{ email: string, password: string }>();
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log('LoginFormComponent initialized.');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log("Form is valid. Submitting:", email, password);
      this.loginClicked.emit({ email, password });
    } else {
      console.log("Form is invalid. Please fill in all fields correctly.");
      
    }
  }

  ForgotPasswordClick(): void {
    // Implement your logic here:
    // Show a modal, navigate to a password reset page, etc.
    console.log("Forgot Password button clicked!");
  }
}


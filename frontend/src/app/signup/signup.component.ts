import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignupService } from '../services/SignupService/signup.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss'
  ],
})

export class SignupComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  
  signUpForm: FormGroup = new FormGroup({
  })
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  gradeLevel: string = "";
  age: number = 0;

  @Output() signUpClicked: EventEmitter<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    gradeLevel: string;
    age: number;
  }> = new EventEmitter<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    gradeLevel: string;
    age: number;
  }>();

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      age: ['', Validators.maxLength(2)],
      role: ['student', Validators.required],
      status: ['true']

    }, { validator: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('SignupComponent API_URL', `${this.apiUrl}/login`);
      console.log("Form is valid. Submitting:",);

      console.log('this.signUpForm.errors', this.signUpForm.errors)
      const formData = { ...this.signUpForm.value };

      // remove the repeatPassword from the property
      delete formData.repeatPassword;

      // Emit the modified form data
      this.signUpClicked.emit(formData);

      // call the signup function to make the request
      this.signup();
    }
  }
  signup(): void {
    console.log('Signup COMPONENT: API URL:', this.apiUrl); 

    if (this.signUpForm.valid) {
      this.signupService.saveSignupData(this.signUpForm.value).subscribe(
        response => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during signup:', error);
          // Handle the error appropriately
          if (error.status === 401) {
            // Unauthorized error (e.g., invalid credentials)
            // Provide feedback to the user
            console.log('Invalid credentials. Please try again.');
          } else if (error.status === 500) {
            // Server error
            // Notify the user about the server issue
            console.log('Server error. Please try again later.');
          } else {
            // Other types of error
            console.log('An error occurred. Please try again.');
          }
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;
  return password === repeatPassword ? null : { passwordMismatch: true };
}


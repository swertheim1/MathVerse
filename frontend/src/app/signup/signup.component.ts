import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignupService } from '../services/SignupService/signup.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

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


  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
  ) {

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
      console.log("Form is valid. Submitting:", );
      
      console.log(this.signUpForm.errors)
      const formData = { ...this.signUpForm.value };
      // remove the repeatPassword from the property
      console.log('FormData Object:', formData)
      delete formData.repeatPassword;
      console.log('FormData after delete repeatPassword Object:', formData)

      // Emit the modified form data
      this.signUpClicked.emit(formData);

      // call the signup function to make the request
      this.signup();
    }
  }
  signup(): void {
    console.log('Signup data being transmitted if it is valid.')
    
    if (this.signUpForm.valid) {
      

      this.signupService.saveSignupData(this.signUpForm.value).subscribe(
        response => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during signup:', error);
          // Optionally, handle the error and provide feedback to the user
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


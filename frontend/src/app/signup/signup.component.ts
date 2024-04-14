import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('LoginFormComponent initialized.');
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['', Validators.required, {validators: passwordMatchValidator}],
      repeatPassword: ['', Validators.required, {validators: passwordMatchValidator}],
      gradeLevel: ['', Validators.required],
      age: ['', Validators.maxLength(2)]

    });
  }

  onSubmit(): void {

  }


  handleGradeLevelChange(): void {
    // Map selected grade level to the appropriate value
    let gradeLevelValue: string;
    switch (this.gradeLevel) {
      case '4th':
        gradeLevelValue = '4th_grade';
        break;
      case '5th':
        gradeLevelValue = '5th_grade';
        break;
      case '6th':
        gradeLevelValue = '6th_grade';
        break;
      default:
        gradeLevelValue = ''; // Set a default value if needed
    }
    // Emit the updated value
    this.signUpClicked.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      gradeLevel: gradeLevelValue,
      age: this.age
    });
    
    console.log(this.firstName),
    console.log(this.lastName),
    console.log(this.email),
    console.log(this.password),
    console.log(this.repeatPassword)
    console.log(this.gradeLevel),
    console.log(this.age)

  }
}


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;
  return password === repeatPassword ? null : { passwordMismatch: true };
}


import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @Output() forgotPasswordClicked: EventEmitter<{ email: string }> = new EventEmitter<{ email: string }>();
  forgotPasswordForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }
  

  onSubmit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
  }
}

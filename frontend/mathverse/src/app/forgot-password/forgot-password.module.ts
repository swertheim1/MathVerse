import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ForgotPasswordComponent} from './forgot-password.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports: [
    ForgotPasswordComponent
  ]
})
export class ForgotPasswordModule { }

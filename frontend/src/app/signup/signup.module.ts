import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../services/SignupService/signup.service';


@NgModule({
  providers: [
    SignupService
  ],
  declarations: [
    SignupComponent
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  exports: [
    SignupComponent
    
  ], 
})
export class SignupModule { }

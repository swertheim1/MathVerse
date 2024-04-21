import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent,
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

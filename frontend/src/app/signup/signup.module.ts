import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent,

  ], // Declare the component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], // Include any other necessary modules
  exports: [], // Export any components or modules if needed
})
export class SignupModule { }

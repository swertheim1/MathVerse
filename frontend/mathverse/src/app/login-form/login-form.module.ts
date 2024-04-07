import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginFormComponent} from './login-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }

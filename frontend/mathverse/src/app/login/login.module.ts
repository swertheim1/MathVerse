import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormModule } from '../login-form/login-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LoginComponent], 
    exports: [LoginComponent],
    imports: [
        CommonModule,
        LoginFormModule,
        FormsModule,
        HttpClientModule
    
    ]
})
export class LoginModule { }
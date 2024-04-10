import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormModule } from "../forms/login-form/login-form.module";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        LoginFormModule
    ]
})
export class LoginModule { }
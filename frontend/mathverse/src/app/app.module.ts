import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TopicsComponent } from '../app/topics/topics.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [TopicsComponent],
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule
  ],
  providers: [AuthService, HttpClient, HttpClientModule],
  bootstrap: [TopicsComponent] 
})
export class AppModule { }
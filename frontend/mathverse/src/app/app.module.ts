import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/AuthorizationServices/auth.service';
import { TopicsComponent } from '../app/topics/topics.component';
import { LoginModule } from './login/login.module';
import { TokenInterceptor as TokenInterceptor } from './services/TokenServices/token.interceptor';
import { CookieService } from 'ngx-cookie-service';

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
  providers: [
    AuthService, 
    HttpClient, 
    HttpClientModule, 
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [TopicsComponent] 
})
export class AppModule { }
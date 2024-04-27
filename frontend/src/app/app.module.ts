import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule, routes } from './app.routes';
import { AppComponent } from './app.component';

import { CookieService } from './services/CookieServices/cookie-service.service';
import { AuthService } from './services/AuthenticationServices/auth.service';
import { TokenInterceptor } from './services/TokenServices/token.interceptor';
import { AuthGuardService } from './services/AuthGuardService/auth-guard.service';
import { DataService } from './services/DataServices/data.service';
import { UserService } from './services/UserService/user.service';
import { TokenService } from './services/TokenServices/token.service';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      routes, {
        enableTracing: true
      }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        },
      },
    }),

  ],
  providers: [
    AuthGuardService,
    AuthService,
    CookieService,
    JwtHelperService, 
    DataService,
    UserService,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [] 
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    // Bootstrap your root component programmatically
    appRef.bootstrap(AppComponent);
  }
}

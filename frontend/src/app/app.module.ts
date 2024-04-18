import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { CookieService } from './services/CookieServices/cookie-service.service';
import { AuthService } from './services/AuthorizationServices/auth.service';
import { TokenInterceptor } from './services/TokenServices/token.interceptor';
import { LocalStorageService } from './services/LocalStorageServices/local-storage-service.service';
import { AuthGuardService } from './services/AuthGuardService/auth-guard.service';
import { HomeComponent } from './home/home.component';
// import { bootstrapApplication } from '@angular/platform-browser';


@NgModule({
  declarations: [
    
  ],
  imports: [
    ReactiveFormsModule, 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([])
  ],

  providers: [
    AuthGuardService,
    AuthService,
    CookieService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: []
})
export class AppModule { 
  ngDoBootstrap(appRef: ApplicationRef) {
    // Bootstrap your root component programmatically
    appRef.bootstrap(AppComponent);
  }
}

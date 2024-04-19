import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routes } from './app.routes';
import { AppComponent } from './app.component';

import { CookieService } from './services/CookieServices/cookie-service.service';
import { AuthService } from './services/AuthorizationServices/auth.service';
import { TokenInterceptor } from './services/TokenServices/token.interceptor';
import { LocalStorageService } from './services/LocalStorageServices/local-storage-service.service';
import { AuthGuardService } from './services/AuthGuardService/auth-guard.service';

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
    RouterModule,
    RouterModule.forRoot([]),
    RouterModule.forRoot(routes, { enableTracing: true })
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

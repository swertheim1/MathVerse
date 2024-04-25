import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  console.log("Is PRODUCTION: ", environment.apiUrl)
  enableProdMode();
}
else {
  console.log('Is not production:', environment.apiUrl )
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

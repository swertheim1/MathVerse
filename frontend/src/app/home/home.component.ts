import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { TokenService } from '../services/TokenServices/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})
export class HomeComponent {


  constructor(

  ) { }

  ngOnInit(): void {
    console.info('HomeComponent initialized');
    
  }

}

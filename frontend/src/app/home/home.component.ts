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
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) { }

}

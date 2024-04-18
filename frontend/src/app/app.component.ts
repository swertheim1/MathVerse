import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Status404Module } from './status-404/status-404.module';
import { LoginModule } from './login/login.module';
import { TopicsModule } from './topics/topics.module';
import { HomeModule } from './home/home.module';
import { HttpClient } from '@angular/common/http';
import { NumberSetsModule } from './number-sets/number-sets.module';
import { SignupModule } from './signup/signup.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    LoginModule,
    TopicsModule,
    HomeModule,
    Status404Module, 
    NumberSetsModule,
    SignupModule 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (private httpClient: HttpClient) {}
  title = 'mathverse';
  authentication = true;
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Status404Module } from './status-404/status-404.module';
import { LoginModule } from './login/login.module';
// import { LoginModalModule } from './login-modal/login-modal.module';
import { TopicsModule } from './topics/topics.module';
import { HomeModule } from './home/home.module';
import { HttpClient } from '@angular/common/http';
import { NumberSetsModule } from './number-sets/number-sets.module';
import { SignupModule } from './signup/signup.module';
import { NavbarModule } from './navbar/navbar.module';
import { AdditionNumbersetsModule } from './addition-numbersets/addition-numbersets.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    LoginModule,
    // LoginModalModule,
    TopicsModule,
    HomeModule,
    Status404Module, 
    NumberSetsModule,
    SignupModule,
    NavbarModule,
    AdditionNumbersetsModule

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (private httpClient: HttpClient) {}
  title = 'mathverse';
  authentication = true;

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  login(credentials: { username: string, password: string }) {
    // Add your login logic here
    console.log('Logging in with username:', credentials.username, 'and password:', credentials.password);
  }
}


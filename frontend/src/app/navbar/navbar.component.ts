import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public router!: Router;

  constructor () {
    router: Router
    
  }

  signUpClick(): void {
    console.log("User being redirected to topics page")
    this.router.navigate(['/signup']);
  }

}

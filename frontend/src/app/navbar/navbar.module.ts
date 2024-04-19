import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkActive,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    
  ]

})
export class NavbarModule { }

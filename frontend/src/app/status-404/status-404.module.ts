import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status404Component } from './status-404.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Status404Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  exports: [
    Status404Component
  ]
})
export class Status404Module { }

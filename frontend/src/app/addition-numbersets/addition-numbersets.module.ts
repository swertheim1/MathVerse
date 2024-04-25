import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionNumbersetsComponent } from './addition-numbersets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AdditionNumbersetsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
  ],
  exports: [
    AdditionNumbersetsComponent
  ]
})
export class AdditionNumbersetsModule { }

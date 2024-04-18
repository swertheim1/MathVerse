import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSetsComponent } from './number-sets.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NumberSetsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    NumberSetsComponent
  ]
})
export class NumberSetsModule { }

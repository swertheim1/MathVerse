import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutModalComponent } from './logout-modal.component';


@NgModule({
  declarations: [
    LogoutModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoutModalComponent
  ]
})
export class LogoutModalModule { }

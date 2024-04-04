import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './topics.component'; // Import TopicsComponent here

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [], // Don't declare TopicsComponent here
  exports: []
})
export class TopicsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'topics',
        pathMatch: 'full'
    },
    {
        path: 'topics',
        loadChildren: () => import('./home_page/topics.component').then( m => m.TopicsComponent)
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
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
        loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: '**',
        redirectTo: 'fallback'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
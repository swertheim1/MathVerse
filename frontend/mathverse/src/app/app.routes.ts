import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TopicsComponent } from './topics/topics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './services/AuthGuardService/auth-guard.service';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'topics', component: TopicsComponent, canActivate: [AuthGuardService] },
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: '**', redirectTo: 'fallback' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
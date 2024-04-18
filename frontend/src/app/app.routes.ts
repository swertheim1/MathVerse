import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TopicsComponent } from './topics/topics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './services/AuthGuardService/auth-guard.service';
import { NumberSetsComponent } from './number-sets/number-sets.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { Status404Component } from './status-404/status-404.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'topics', component: TopicsComponent, canActivate: [AuthGuardService] }, //
    { path: 'numbersets', component: NumberSetsComponent, canActivate: [AuthGuardService] }, //
    { path: 'signup', component: SignupComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'status-404', component: Status404Component }, // Corrected route for handling unknown routes
    { path: 'home', redirectTo: '', pathMatch: 'full' }, // Redirect /home to /
    { path: '**', redirectTo: 'status-404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
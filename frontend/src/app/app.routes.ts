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
import { AdditionNumbersetsComponent } from './addition-numbersets/addition-numbersets.component';
import { AdditionPositiveWholeNumbersComponent } from './addition-positive-whole-numbers/addition-positive-whole-numbers.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { ReportsComponent } from './reports/reports.component';
import { AdditionPositiveDecimalsComponent } from './addition-positive-decimals/addition-positive-decimals.component';
import { AdditionPositiveFractionsComponent } from './addition-positive-fractions/addition-positive-fractions.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent },
    { path: 'topics', component: TopicsComponent, canActivate: [AuthGuardService] }, 
    { path: 'numbersets', component: NumberSetsComponent, canActivate: [AuthGuardService] }, 
    { path: 'reports', component: ReportsComponent},
    { path: 'addition-numbersets', component: AdditionNumbersetsComponent },
    { path: 'addition-positive-whole-numbers', component: AdditionPositiveWholeNumbersComponent},
    { path: 'addition-positive-decimals', component: AdditionPositiveDecimalsComponent},
    { path: 'addition-fractions', component: AdditionPositiveFractionsComponent},
    
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'logout-modal', component: LogoutModalComponent},
    { path: 'status-404', component: Status404Component }, 
    { path: 'home', redirectTo: '', pathMatch: 'full' }, // Redirect /home to /
    { path: '**', redirectTo: 'status-404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
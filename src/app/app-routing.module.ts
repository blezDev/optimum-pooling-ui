import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BillingComponent } from './billing/billing.component';
import { TripHistoryComponent } from './trip-history/trip-history.component'; 

import {authGuard} from "./guards/auth.guard";
import {reverseAuthGuard} from "./guards/reverse-auth.guard";
import { UserridesComponent } from './userrides/userrides.component';
const routes: Routes = [

  { path: 'login', component: LoginComponent  , canActivate : [reverseAuthGuard]},
  { path: 'sign-up', component: SignUpComponent ,canActivate : [reverseAuthGuard]},
  { path: 'verify', component: VerificationComponent ,canActivate : [reverseAuthGuard]},
  { path: 'home', component: HomeComponent,canActivate : [authGuard]},
  { path: 'publish', component: PublishComponent,canActivate : [authGuard] },
  {path : 'change-password', component : ChangePasswordComponent,canActivate : [authGuard]},
  { path: 'trip-history', component: TripHistoryComponent,canActivate : [authGuard] }, 
  { path: 'user-rides', component: TripHistoryComponent,canActivate : [authGuard] }, 
  {path : 'bill', component : BillingComponent,canActivate : [authGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

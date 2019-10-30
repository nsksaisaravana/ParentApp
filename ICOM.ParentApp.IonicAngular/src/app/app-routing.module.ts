import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'changeFirstTimePassword', loadChildren: './change-first-time-password/change-first-time-password.module#ChangeFirstTimePasswordPageModule' },
  { path: 'inside',canActivate:[AuthGuardService], 
    loadChildren: './inside/inside.module#InsideModule' 
    //Add Auth Guard
  },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

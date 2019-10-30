import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http'
import { LoginService } from './services/login.service';
//import { TokenInterceptorService } from '../services/token-interceptor.service';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [
    LoginService,
    // TokenInterceptorService,{
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:TokenInterceptorService,
    //   multi:true
    // }
  ]
})
export class LoginPageModule {}

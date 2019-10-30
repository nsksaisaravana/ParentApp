import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordService } from '../inside/changepassword/services/changepassword.service';
import { IonicModule } from '@ionic/angular';

import { ChangeFirstTimePasswordPage } from './change-first-time-password.page';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ChangeFirstTimePasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeFirstTimePasswordPage],
  providers:[
    ChangepasswordService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class ChangeFirstTimePasswordPageModule {}

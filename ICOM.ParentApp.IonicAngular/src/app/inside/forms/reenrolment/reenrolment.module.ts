import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReenrolmentPage } from './reenrolment.page';
import {SignaturePadModule} from 'angular2-signaturepad';
import { MaintainUpcomingeventsService } from '../../admin/maintaincalendar/services/maintain-upcomingevents.service';
import { TokenInterceptorService } from '../../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: ReenrolmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SignaturePadModule
  ],
  declarations: [ReenrolmentPage],
  providers: [
    MaintainUpcomingeventsService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class ReenrolmentPageModule {}

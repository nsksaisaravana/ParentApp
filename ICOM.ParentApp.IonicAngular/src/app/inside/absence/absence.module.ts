import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbsencePage } from './absence.page';
import { AbsenceService } from './services/absence.service';
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import {SignaturepadComponent} from '../util/signaturepad/signaturepad.component';
import {SharedModule} from '../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: AbsencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbsencePage],
  providers:[
    AbsenceService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class AbsencePageModule {}

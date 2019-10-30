import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormsPage } from './forms.page';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { EnrolmentFormComponent } from './components/enrolment-form/enrolment-form.component';
import {SignaturePadModule} from 'angular2-signaturepad';
import {ImageUploadService} from './services/imageUpload.service';
import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http'
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { ReenrolmentService } from './services/reenrolment.service';
const routes: Routes = [
  {
    path: '',
    component: FormsPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SignaturePadModule,
    HttpClientModule
  ],
  declarations: [FormsPage, FormsListComponent, EnrolmentFormComponent],
  providers: [
    ImageUploadService,
    ReenrolmentService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class FormsPageModule {}

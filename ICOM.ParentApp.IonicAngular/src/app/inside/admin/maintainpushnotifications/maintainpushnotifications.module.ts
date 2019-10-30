import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FileUploadModule} from 'primeng/fileupload';

import { IonicModule } from '@ionic/angular';

import { MaintainpushnotificationsPage } from './maintainpushnotifications.page';
import { PushnotificationslistComponent } from './components/pushnotificationslist/pushnotificationslist.component';
import { NewnotificationComponent } from './components/newnotification/newnotification.component';
import { PushnotificationsService } from './services/pushnotifications.service';
import { TokenInterceptorService } from '../../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: MaintainpushnotificationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule
  ],
  declarations: [MaintainpushnotificationsPage, PushnotificationslistComponent, NewnotificationComponent],
    providers: [
      PushnotificationsService,
      TokenInterceptorService,{
        provide:HTTP_INTERCEPTORS,
        useClass:TokenInterceptorService,
        multi:true
      }
    
  ]
})
export class MaintainpushnotificationsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EditorModule} from 'primeng/editor';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { IonicModule } from '@ionic/angular';

import { MaintainNotificationsPage } from './maintain-notifications.page';
import { NotificationListComponent, MaintainNotificationPopUpDialog } from '../components/notification-list/notification-list.component';
import { NotificationNeweditComponent } from '../components/notification-newedit/notification-newedit.component';
import { TokenInterceptorService } from '../../../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaintainNotificationsService } from '../services/maintain-notifications.service';


const routes: Routes = [
  {
    path: '',
    component: MaintainNotificationsPage
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
    EditorModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents:[
    MaintainNotificationPopUpDialog
  ],
  declarations: [MaintainNotificationsPage,NotificationListComponent,NotificationNeweditComponent,MaintainNotificationPopUpDialog],
  providers: [
    MaintainNotificationsService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class MaintainNotificationsPageModule {}

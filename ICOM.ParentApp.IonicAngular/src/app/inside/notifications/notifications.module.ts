import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { NotificationsPage } from './notifications.page';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationsDetailComponent } from './components/notifications-detail/notifications-detail.component';
import { NotificationService } from './services/notification.service';
import { TokenInterceptorService } from '../../services/token-interceptor.service';

import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http'
import { PushnotificationsService } from '../admin/maintainpushnotifications/services/pushnotifications.service';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
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
    MatButtonModule
  ],
  declarations: [NotificationsPage, NotificationsListComponent, NotificationsDetailComponent],
  providers: [
    NotificationService,
    PushnotificationsService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class NotificationsPageModule {}

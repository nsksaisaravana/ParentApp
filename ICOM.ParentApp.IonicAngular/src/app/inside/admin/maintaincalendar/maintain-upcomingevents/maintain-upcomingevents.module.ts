import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {SidebarModule} from 'primeng/sidebar';
//import { AgmCoreModule } from '@agm/core';
import {EditorModule} from 'primeng/editor';
import {MatDialogModule} from '@angular/material/dialog';

import { MaintainUpcomingeventsPage } from './maintain-upcomingevents.page';
import {UpcomingeventsNeweditComponent} from '../components/upcomingevents-newedit/upcomingevents-newedit.component';
import { UpcomingeventsListComponent, PopUpDialog } from '../components/upcomingevents-list/upcomingevents-list.component';
import { AppSettings } from '../../../../services/appsettings.service';
import { TokenInterceptorService } from '../../../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaintainUpcomingeventsService } from '../services/maintain-upcomingevents.service';
const routes: Routes = [
  {
    path: '',
    component: MaintainUpcomingeventsPage
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
    MatButtonModule,
    SidebarModule,
    EditorModule,
    MatDialogModule,
    //AgmCoreModule.forRoot({
     // apiKey: AppSettings.googleMapsApiKey,
     // libraries:["places"]
    //})
  ],
  entryComponents:[
    PopUpDialog
  ],
  declarations: [MaintainUpcomingeventsPage,UpcomingeventsNeweditComponent,UpcomingeventsListComponent,PopUpDialog],
  providers: [
    MaintainUpcomingeventsService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class MaintainUpcomingeventsPageModule {}

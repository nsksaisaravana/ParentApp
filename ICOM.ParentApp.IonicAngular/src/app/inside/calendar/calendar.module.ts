import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';
import {MatExpansionModule} from '@angular/material/expansion';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { UpcomingeventsListComponent } from './components/upcomingevents-list/upcomingevents-list.component';
import { UpcomingeventsDetailComponent } from './components/upcomingevents-detail/upcomingevents-detail.component';

import {CalendarService} from './services/calendar.service'
import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http'
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { EventmonthPipe } from './pipes/eventmonth.pipe';

import {SanitizeHtmlPipe} from '../../pipe/sanitize-html.pipe';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    HttpClientModule
  ],
  declarations: [CalendarPage, GoogleMapsComponent, UpcomingeventsListComponent, 
    UpcomingeventsDetailComponent, EventmonthPipe,SanitizeHtmlPipe],
  providers: [
    CalendarService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class CalendarPageModule {}

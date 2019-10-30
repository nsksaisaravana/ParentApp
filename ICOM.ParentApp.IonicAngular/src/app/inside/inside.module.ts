import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsideRoutingModule } from './inside-routing.module';
import { NavigationPageModule } from './navigation/navigation.module';
import { CalendarPageModule } from './calendar/calendar.module';
import { HomePageModule } from './home/home.module';
import { NotificationsPageModule } from './notifications/notifications.module';
import { NewsletterPageModule } from './newsletter/newsletter.module';
import { AbsencePageModule } from './absence/absence.module';
import { FacebookPageModule } from './facebook/facebook.module';
import { AboutusPageModule } from './aboutus/aboutus.module';

import { SettingsPageModule } from './settings/settings.module';
import { LogoutPageModule } from './logout/logout.module';
import { FormsPageModule } from './forms/forms.module';
import { ReenrolmentPageModule } from './forms/reenrolment/reenrolment.module';
import { ChangepasswordPageModule } from './changepassword/changepassword.module';
import { MaintainUpcomingeventsPageModule } from './admin/maintaincalendar/maintain-upcomingevents/maintain-upcomingevents.module';
import { MaintainNotificationsPageModule } from './admin/maintainnotifications/maintain-notifications/maintain-notifications.module';
import { MaintainnewsletterPageModule } from './admin/maintainnewsletter/maintainnewsletter.module';
import { MaintainpushnotificationsPageModule } from './admin/maintainpushnotifications/maintainpushnotifications.module';
import { ContactPageModule } from './contact/contact.module';
//import { SharedPageModule } from './shared/shared.module';
//import { SignaturepadComponent } from './util/signaturepad/signaturepad.component';

@NgModule({
  imports: [
    CommonModule,
    InsideRoutingModule,
    NavigationPageModule,
    CalendarPageModule,
    NotificationsPageModule,
    NewsletterPageModule,
    HomePageModule,
    AbsencePageModule,
    FacebookPageModule,
    AboutusPageModule,
    SettingsPageModule,
    LogoutPageModule,
    ContactPageModule,
    FormsPageModule,
    ReenrolmentPageModule,
    ChangepasswordPageModule,
    MaintainUpcomingeventsPageModule ,
    MaintainNotificationsPageModule,
    MaintainnewsletterPageModule,
    MaintainpushnotificationsPageModule,
    //SharedPageModule
  ],
  declarations: [],

})
export class InsideModule { }

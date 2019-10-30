import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationPage } from './navigation/navigation.page';
import { CalendarPage } from './calendar/calendar.page';
import { NotificationsPage } from './notifications/notifications.page';
import { NewsletterPage } from './newsletter/newsletter.page';
import { HomePage } from './home/home.page';
import { FormsPage } from './forms/forms.page';
import { ReenrolmentPage } from './forms/reenrolment/reenrolment.page';
import {ChangepasswordPage} from './changepassword/changepassword.page';
import { MaintainUpcomingeventsPage } from './admin/maintaincalendar/maintain-upcomingevents/maintain-upcomingevents.page';
import { MaintainNotificationsPage } from './admin/maintainnotifications/maintain-notifications/maintain-notifications.page';
import { MaintainnewsletterPage } from './admin/maintainnewsletter/maintainnewsletter.page';
import { MaintainpushnotificationsPage } from './admin/maintainpushnotifications/maintainpushnotifications.page';
const routes: Routes = [
  {
    path:'menus',
    component:NavigationPage,
    children:[
        {
          path:'home',
          component:HomePage
        },
        {
          path:'calendar',
          component:CalendarPage
        },
        {
          path:'notification',
          component:NotificationsPage
        },
        {
          path:'newsletter',
          component:NewsletterPage
        },
        {
          path:'forms',
          component:FormsPage
        },
        {
          path:'reenrolment',
          component:ReenrolmentPage
        },
        {
          path:'changepassword',
          component:ChangepasswordPage
        },
        {
          path:'maintainupcomingevents',
          component:MaintainUpcomingeventsPage
        },
        {
          path:'maintainnotifications',
          component:MaintainpushnotificationsPage
        },
        {
          path:'maintainnewsletter',
          component:MaintainnewsletterPage
        },
        { path: 'absence', loadChildren: './absence/absence.module#AbsencePageModule' },
        { path: 'facebook', loadChildren: './facebook/facebook.module#FacebookPageModule' },
        { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
        { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
        { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
        { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
    ]
  },
  { path: 'reenrolment', loadChildren: './forms/reenrolment/reenrolment.module#ReenrolmentPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  //{ path: 'shared', loadChildren: './shared/shared.module#SharedPageModule' },
  //{ path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  //{ path: 'maintainpushnotifications', loadChildren: './admin/maintainpushnotifications/maintainpushnotifications.module#MaintainpushnotificationsPageModule' },
  // { path: 'maintain-upcomingevents', loadChildren: './admin/maintaincalendar/maintain-upcomingevents/maintain-upcomingevents.module#MaintainUpcomingeventsPageModule' },
  // { path: 'maintainnewsletter', loadChildren: './admin/maintainnewsletter/maintainnewsletter.module#MaintainnewsletterPageModule' },
  // { path: 'maintainnotifications', loadChildren: './admin/maintainnotifications/maintainnotifications.module#MaintainnotificationsPageModule' },
  // { path: 'maintain-notifications', loadChildren: './admin/maintainnotifications/maintain-notifications/maintain-notifications.module#MaintainNotificationsPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule { }

import { Component,  OnInit,ViewChild } from '@angular/core';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationsDetailComponent } from './components/notifications-detail/notifications-detail.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment'
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  isNotificationList:boolean=true;


  @ViewChild(NotificationsDetailComponent,{static: false} ) notificationDetail: NotificationsDetailComponent;
  @ViewChild(NotificationsListComponent,{static: false} ) notificationList: NotificationsListComponent; 

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  clickNotificationParent($event:any){
    //console.log($event);
    this.isNotificationList=false;
    //this.notificationDetail.notificationDetailTitle=$event.Title;
    //.notificationDetail.notificationDetailedDescription=$event.DetailedDesc;
    this.notificationDetail.notificationTitle=$event.Title;
    this.notificationDetail.notificationUpdatedDate=moment.utc($event.SendDate).local().format("Do MMM, YYYY");  //$event.SendDate;
    this.notificationDetail.notificationDesc=$event.Desc;
    this.notificationDetail.notificationPdfPath=$event.Path;
    this.notificationDetail.notificationFileName=$event.FileName;
    this.notificationDetail.notificationId=$event.Id
    this.notificationDetail.documentExists=$event.DocumentExists;
  }

  clickNotificationDetailParent($event){
    console.log($event);
    this.isNotificationList=true;
  }

}

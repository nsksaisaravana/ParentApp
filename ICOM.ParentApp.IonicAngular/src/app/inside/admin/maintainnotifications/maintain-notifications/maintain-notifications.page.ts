import { Component, OnInit,ViewChild } from '@angular/core';
import { NotificationListComponent } from '../components/notification-list/notification-list.component';
import { NotificationNeweditComponent } from '../components/notification-newedit/notification-newedit.component';

@Component({
  selector: 'app-maintain-notifications',
  templateUrl: './maintain-notifications.page.html',
  styleUrls: ['./maintain-notifications.page.scss'],
})
export class MaintainNotificationsPage implements OnInit {
  showNotificationList:boolean=true;

  @ViewChild(NotificationListComponent ,{static:false}) notificationListComponent: NotificationListComponent;
  @ViewChild(NotificationNeweditComponent,{static:false} ) notificationDetailsComponent: NotificationNeweditComponent; 

  constructor() { }

  ngOnInit() {
  }

  clickMaintainNotificationListParent($event){
    this.showNotificationList=false;
    if($event){
      this.notificationDetailsComponent.notification=$event;
    }else{
      this.notificationDetailsComponent.clearNotification();
    }
    
  }

  clickMaintainNotificationDetailParent($event){
    this.showNotificationList=true;
    if($event=='Saved'){
      this.notificationListComponent.fetchNotificationDetails();
    }

  }

}

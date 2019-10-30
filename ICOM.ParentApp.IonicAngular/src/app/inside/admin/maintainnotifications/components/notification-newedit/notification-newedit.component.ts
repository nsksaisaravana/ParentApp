import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MaintainNotificationsService } from '../../services/maintain-notifications.service';
import * as moment from 'moment'

@Component({
  selector: 'app-notification-newedit',
  templateUrl: './notification-newedit.component.html',
  styleUrls: ['./notification-newedit.component.scss']
})
export class NotificationNeweditComponent implements OnInit {

  notification={} as any;
  @Output() clickMaintainNotificationDetailChild: EventEmitter<any> = new EventEmitter<any>();
  constructor(private maintainNotificationService:MaintainNotificationsService) { }

  ngOnInit() {
    this.notification.FromDate=moment.utc(new Date()).local().format();    //new Date().toISOString();
    this.notification.ToDate=moment.utc(new Date()).local().format();
  }

  async saveNotification(){
    console.log(this.notification);
    if(this.notification.Id==0){
      await this.maintainNotificationService.saveNewNotiification(this.notification).toPromise();
    }else{
      await this.maintainNotificationService.updateNotifications(this.notification,this.notification.Id).toPromise();
    }
    this.clickMaintainNotificationDetailChild.emit("Saved");
    
  }

  async updateNotification(){
    await this.maintainNotificationService.updateNotifications(this.notification,this.notification.Id).toPromise();
  }



  clearNotification(){
    this.notification.Id=0;
    this.notification.Title='';
    this.notification.ShortDesc='';
    this.notification.DetailedDesc='';
    this.notification.DateToBeNotified=moment.utc(new Date()).local().format();   
  }

  cancelNotification(){
    this.clickMaintainNotificationDetailChild.emit("Cancel");
  }

}

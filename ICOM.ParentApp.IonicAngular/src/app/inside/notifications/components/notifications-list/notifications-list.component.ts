import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {NotificationService} from '../../services/notification.service'
import { LoadingController } from '@ionic/angular';
import { PushnotificationsService } from '../../../admin/maintainpushnotifications/services/pushnotifications.service';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  dataSource:any;
  notificationItems:any=[];
  pushNotificationDetails:any;
  //displayedColumns: string[] = ['Checkbox','Title',  'SendDate'];
  displayedColumns: string[] = ['Title',  'SendDate'];

  @Output() clickNotificationChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notificationService:NotificationService,public loadingController: LoadingController,
    private pushNotificationsService:PushnotificationsService,private router:Router,private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit() {
    //this.fetchNewsLetterList();
    this.fetchPushNotificationDetails()
  }

  notificationItemClick(notificationItem:any){
    this.clickNotificationChild.emit(notificationItem);
  }

  async fetchNewsLetterList(){
    this.notificationItems=await  this.notificationService.fetchNewsLetterItems().toPromise();
    console.log(this.notificationItems);
  }

  async fetchPushNotificationDetails(){
    try{
      await this.presentLoading();
      this.pushNotificationDetails=await this.pushNotificationsService.fetchPushNotifications().toPromise();
      this.dissMissLoading();
      console.log(this.pushNotificationDetails);
    }
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading PushNotifications',
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  pushNotificationClickEvent(notificationItem){
    this.clickNotificationChild.emit(notificationItem);
  }

}

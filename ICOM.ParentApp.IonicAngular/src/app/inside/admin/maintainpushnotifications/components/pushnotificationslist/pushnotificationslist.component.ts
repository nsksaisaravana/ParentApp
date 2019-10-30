import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { PushnotificationsService } from '../../services/pushnotifications.service';
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../../../services/user-authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pushnotificationslist',
  templateUrl: './pushnotificationslist.component.html',
  styleUrls: ['./pushnotificationslist.component.scss']
})
export class PushnotificationslistComponent implements OnInit {
  dataSource:any;
  pushNotificationDetails:any;
  displayedColumns: string[] = ['Title', 'Status', 'SendDate'];

  @Output() clickPushNotificationListChild: EventEmitter<any> = new EventEmitter<any>();
  constructor(private pushNotificationsService:PushnotificationsService,public loadingController: LoadingController,
    private router:Router ,private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit() {
    this.fetchPushNotificationDetails();
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

  createExperiment(){
    this.clickPushNotificationListChild.emit(true);
  }

  newNotification(){
    this.clickPushNotificationListChild.emit(false);
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




}

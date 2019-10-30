import { Component, OnInit,ViewChild } from '@angular/core';
import { PushnotificationslistComponent } from './components/pushnotificationslist/pushnotificationslist.component';
import { NewnotificationComponent } from './components/newnotification/newnotification.component';

@Component({
  selector: 'app-maintainpushnotifications',
  templateUrl: './maintainpushnotifications.page.html',
  styleUrls: ['./maintainpushnotifications.page.scss'],
})
export class MaintainpushnotificationsPage implements OnInit {
  showNotificationList:boolean=true;



  @ViewChild(PushnotificationslistComponent ,{static:false}) notificationListComponent: PushnotificationslistComponent;
  @ViewChild(NewnotificationComponent,{static:false} ) notificationDetailsComponent: NewnotificationComponent; 

  constructor() { }

  ngOnInit() {

  }


  clickPushNotificationListParent($event){
    this.showNotificationList=false;
    if($event){
      console.log("Create new message");
    }else{
      console.log("Create experiment ");
    }
    
  }

  clickPushNotificationNewParent($event){
    this.showNotificationList=true;
    this.notificationListComponent.fetchPushNotificationDetails();
  }

}

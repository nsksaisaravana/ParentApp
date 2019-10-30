import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {IPushNotification} from '../../models/pushnotifcation';
import { PushnotificationsService } from '../../services/pushnotifications.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-newnotification',
  templateUrl: './newnotification.component.html',
  styleUrls: ['./newnotification.component.scss']
})
export class NewnotificationComponent implements OnInit {

  pushNotificationItem:IPushNotification={} as any;
  notificationText:string;
  //notification:any;
  notification={} as any;
  uploadedPdfBlob:any;
  uploadedPdf:any;
  base64string:string='';
  fileName:string='';
  @Output() clickPushNotificationNewChild: EventEmitter<any> = new EventEmitter<any>();
  constructor(private pushNotificationsService:PushnotificationsService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  async publishNotification(){
    this.pushNotificationItem.title=this.notification.notificationText;
    //this.pushNotificationItem.title= "Blah \r\n SecondLine \r\n";
    this.pushNotificationItem.isExperiment=false;
    this.pushNotificationItem.base64String=this.base64string;
    this.pushNotificationItem.shortDesc=this.notification.ShortDesc;
    this.pushNotificationItem.fileName=this.fileName;
    await this.pushNotificationsService.savePushNotifications(this.pushNotificationItem).toPromise();
    console.log("Notificaiton has been pushed");
    this.clickPushNotificationNewChild.emit();
  }

  cancelPushNotification(){
    this.clickPushNotificationNewChild.emit();
  }

  async onUploadPdfFile(event){
    //console.log(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    let fileUrl=window.URL.createObjectURL(event.files[0]);
    this.fileName=event.files[0].name;
    this.uploadedPdf= this.sanitizer.bypassSecurityTrustUrl(
      fileUrl);
    this.uploadedPdfBlob = await fetch(fileUrl).then(r => r.blob());
    //console.log(blob);
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedPdfBlob); 
    reader.onloadend = () => {
     //var base64data = reader.result.toString(); 
      this.base64string=reader.result.toString(); 
      this.base64string=this.base64string.split(',')[1];
      console.log(this.base64string);
    }
  }



}

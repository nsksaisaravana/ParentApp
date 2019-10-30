import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class PushnotificationsService {

  constructor(private http:HttpClient) { }


  fetchPushNotifications(){
    return this.http.get(AppSettings.API_ENDPOINT+ "PushNotifications");
  }

  savePushNotifications(pushNotificationItem:any){
    let notificationArray="[" + JSON.stringify(pushNotificationItem) + "]";
    notificationArray=JSON.parse(notificationArray);
    return this.http.post(AppSettings.API_ENDPOINT + "PushNotifications",notificationArray);
  }




}

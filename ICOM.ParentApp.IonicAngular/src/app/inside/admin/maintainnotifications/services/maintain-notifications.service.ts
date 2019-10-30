import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class MaintainNotificationsService {

  constructor(private http:HttpClient) { }


  saveNewNotiification(notificationItem:any){
    let notificationArray="[" + JSON.stringify(notificationItem) + "]";
    notificationArray=JSON.parse(notificationArray);
    return this.http.post(AppSettings.API_ENDPOINT + "MaintainNotification",notificationArray);
  }

  fetchNotifications(){
    return this.http.get(AppSettings.API_ENDPOINT+ "MaintainNotification");
  }

  updateNotifications(notificationItem:any,itemId:number){
    let notificationArray="[" + JSON.stringify(notificationItem) + "]";
    notificationArray=JSON.parse(notificationArray);
    return this.http.put(AppSettings.API_ENDPOINT + "MaintainNotification/"+itemId,notificationArray);
  }

  deleteNotification(itemId:number){
    return this.http.delete(AppSettings.API_ENDPOINT+"MaintainNotification/"+itemId);
  }

}

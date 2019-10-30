import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  saveFirebaseToken(firebaseToken:any){
    let notificationArray="[" + JSON.stringify(firebaseToken) + "]";
    notificationArray=JSON.parse(notificationArray);
    return this.http.put(AppSettings.API_ENDPOINT + "PushNotifications/1",notificationArray);
  }


}

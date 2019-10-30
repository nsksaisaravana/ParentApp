import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppSettings } from '../../../services/appsettings.service';
import {Observable,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  fetchNewsLetterItems(){
    return this.http.get(AppSettings.API_ENDPOINT+"Notifications");
  }

  downloadNotificationPdf(itemId): Observable<Blob>{
    return this.http.get(AppSettings.API_ENDPOINT + "PushNotifications/" + itemId , {
      responseType: "blob"
    });
  }


}

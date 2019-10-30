import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class MaintainUpcomingeventsService {

  constructor(private http:HttpClient) { }

  saveNewUpComingEvent(upcomingEvent:any){
    let upcomingEventArray="[" + JSON.stringify(upcomingEvent) + "]";
    upcomingEventArray=JSON.parse(upcomingEventArray);
    return this.http.post(AppSettings.API_ENDPOINT + "MaintainUpcomingEvent",upcomingEventArray);
  }

  fetchUpComingEvents(){
    return this.http.get(AppSettings.API_ENDPOINT+ "MaintainUpcomingEvent");
  }

  updateUpComingEvenet(upcomingEvent:any,itemId:number){
    let upcomingEventArray="[" + JSON.stringify(upcomingEvent) + "]";
    upcomingEventArray=JSON.parse(upcomingEventArray);
    return this.http.put(AppSettings.API_ENDPOINT + "MaintainUpcomingEvent/"+itemId,upcomingEventArray);
  }

  deleteUpComingEvent(itemId:number){
    return this.http.delete(AppSettings.API_ENDPOINT+"MaintainUpcomingEvent/"+itemId);
  }

}

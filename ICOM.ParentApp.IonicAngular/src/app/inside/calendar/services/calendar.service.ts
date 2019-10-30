import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppSettings } from '../../../services/appsettings.service';
import {Observable,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  upcomingEventDetails:any=[];
  eventMonths:any=[];
  constructor(private http:HttpClient) { }

  fetchUpcomingEvents(){
    return this.http.get(AppSettings.API_ENDPOINT+"UpcomingEvents");
  }


}

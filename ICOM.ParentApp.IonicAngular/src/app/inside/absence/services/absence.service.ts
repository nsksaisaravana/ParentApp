import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http:HttpClient) { }

  saveAbsenceDetails(absenceDetails:any){
    let absenceArray="[" + JSON.stringify(absenceDetails) + "]";
    absenceArray=JSON.parse(absenceArray);
    return this.http.post(AppSettings.API_ENDPOINT + "Absence",absenceArray);
  }
}
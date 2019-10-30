import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class ReenrolmentService {

  constructor(private http:HttpClient) { }

  saveEnrolmentDetails(enrolmentDetails:any){
    let enrolmentArray="[" + JSON.stringify(enrolmentDetails) + "]";
    enrolmentArray=JSON.parse(enrolmentArray);
    return this.http.post(AppSettings.API_ENDPOINT + "Enrolment",enrolmentArray);
  }

  fetchAllForms(){
    return this.http.get(AppSettings.API_ENDPOINT+"Forms");
  }
}

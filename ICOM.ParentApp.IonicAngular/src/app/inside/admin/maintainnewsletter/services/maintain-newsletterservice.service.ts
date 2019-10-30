import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../../services/appsettings.service'

@Injectable({
  providedIn: 'root'
})
export class MaintainNewsletterserviceService {

  constructor(private http:HttpClient) { }

  saveNewNewsLetter(newsletterItem:any){
    let newsletterArray="[" + JSON.stringify(newsletterItem) + "]";
    newsletterArray=JSON.parse(newsletterArray);
    return this.http.post(AppSettings.API_ENDPOINT + "MaintainNewsLetter",newsletterArray);
  }

  fetchNewsLetters(){
    return this.http.get(AppSettings.API_ENDPOINT+ "MaintainNewsLetter");
  }

  updateNewsLetter(newsletterItem:any,itemId:number){
    let newsletterArray="[" + JSON.stringify(newsletterItem) + "]";
    newsletterArray=JSON.parse(newsletterArray);
    return this.http.put(AppSettings.API_ENDPOINT + "MaintainNewsLetter/"+itemId,newsletterArray);
  }

  deleteNewsLetter(itemId:number){
    return this.http.delete(AppSettings.API_ENDPOINT+"MaintainNewsLetter/"+itemId);
  }

  deleteNewsLetterDocument(itemId:number){
    return this.http.delete(AppSettings.API_ENDPOINT+"NewsLetterList/"+itemId);
  }

  uploadNewsLetterImage(fileToUpload:any){
    return this.http.post(AppSettings.API_ENDPOINT + "NewsletterUploadImage",fileToUpload);
  }

  uploadNewsLetterPdf(fileToUpload:any){
    return this.http.post(AppSettings.API_ENDPOINT + "NewsletterUploadPdf",fileToUpload);
  }

  uploadUpdatedNewsLetterImage(fileToUpload:any){
    return this.http.post(AppSettings.API_ENDPOINT + "UpdateNewsletterUploadImage",fileToUpload);
  }

  uploadUpdatedNewsLetterPdf(fileToUpload:any){
    return this.http.post(AppSettings.API_ENDPOINT + "UpdateNewsletterUploadPdf",fileToUpload);
  }


}

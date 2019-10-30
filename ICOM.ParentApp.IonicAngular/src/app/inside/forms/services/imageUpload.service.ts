import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppSettings} from '../../../services/appsettings.service'
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http:HttpClient) { }

  uploadImage(fileToUpload:any){
    return this.http.post(AppSettings.API_ENDPOINT + "UploadImage",fileToUpload);
  }

  downloadFormsPdf(formName:string): Observable<Blob>{
    return this.http.get(AppSettings.API_ENDPOINT + "formdownload/" + formName , {
      responseType: "blob"
    });
  }


}

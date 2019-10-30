import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppSettings } from '../../../services/appsettings.service';
import {Observable,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http:HttpClient) { }

  fetchNewsLetterItems(){
    return this.http.get(AppSettings.API_ENDPOINT+"NewsLetterList");
  }

  downloadNewsLetterImage(itemId): Observable<Blob>{
    return this.http.get(AppSettings.API_ENDPOINT + "DownloadNewsLetterImage/" + itemId , {
      responseType: "blob"
    });
  }

  downloadNewsLetterPdf(itemId): Observable<Blob>{
    return this.http.get(AppSettings.API_ENDPOINT + "NewsLetterPdfDownload/" + itemId , {
      responseType: "blob"
    });
  }

}

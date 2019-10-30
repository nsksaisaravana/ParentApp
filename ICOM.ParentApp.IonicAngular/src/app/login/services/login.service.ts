import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { AppSettings } from '../../services/appsettings.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  validateUserIdAndPassword(userId:string,password:string){
    return this.http.get(AppSettings.API_ENDPOINT+"logindetails/"+userId+"/"+password );
  }
}

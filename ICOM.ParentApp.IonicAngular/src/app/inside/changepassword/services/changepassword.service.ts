import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { AppSettings } from '../../../services/appsettings.service';
@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http:HttpClient) { }


  changePassword(userName:string,newPassword:string,currentPassword:string){
    return this.http.get(AppSettings.API_ENDPOINT+"changepassword/"+userName+"/"+newPassword+"/" +currentPassword );
  }

}

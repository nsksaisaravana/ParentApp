import { Injectable } from '@angular/core';
import { SessionStorageService,LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  currentUserToken:any;
  isUserLoggedIn=false;
  userDetails:any;
  constructor(private sessionStorage:SessionStorageService,private localStorage:LocalStorageService) { 
    this.currentUserToken='';
  }

  verifyLogin(){
    //let sessionIsUserLoggedIn= this.sessionStorage.retrieve('isUserLoggedIn');
    let localIsUserLoggedIn= this.localStorage.retrieve('isUserLoggedIn');
    if(localIsUserLoggedIn && localIsUserLoggedIn=='true'){
      this.isUserLoggedIn=true;
      //let sessionLoginDetails=this.sessionStorage.retrieve('loginDetails');
      let localLoginDetails=this.localStorage.retrieve('loginDetails');
      this.userDetails=JSON.parse(localLoginDetails);
      this.currentUserToken=this.userDetails.Token;
    }
    console.log(localIsUserLoggedIn);
    return this.isUserLoggedIn;
  }

  blankLoginDetails(){
    this.localStorage.store('isUserLoggedIn',"false");
    this.localStorage.store('loginDetails',"");
  }
}

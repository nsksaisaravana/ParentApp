import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate,Router} from '@angular/router';
import {UserAuthenticationService} from './user-authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private userAuthenticationService:UserAuthenticationService) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    return this.checkLoggedIn();

  }

  checkLoggedIn():boolean{
    // if(this.authService.verifyLogin("")){
    //   return true;
    // }else{
    //     this.router.navigate(['']);
    //     return false;
    // }
    if(this.userAuthenticationService.verifyLogin()){
      return true;
    }else{
          this.router.navigate(['']);
          return false;
    }
  }

}

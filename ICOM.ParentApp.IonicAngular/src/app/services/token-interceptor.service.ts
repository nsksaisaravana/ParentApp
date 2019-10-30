import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpInterceptor,HttpHandler,HttpRequest,HttpEvent} from '@angular/common/http';
import {UserAuthenticationService} from './user-authentication.service';

@Injectable({
  providedIn:'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService:UserAuthenticationService) { }

  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    request=request.clone({
      setHeaders:{
        Authorization:this.authService.currentUserToken,
        Content: 'application/json; charset=utf-8'
      }
    })
    return next.handle(request);
  }
}

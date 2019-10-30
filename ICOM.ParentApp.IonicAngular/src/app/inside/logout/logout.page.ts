import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { SessionStorageService,LocalStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router,private localStorage:LocalStorageService) {
    this.localStorage.store('isUserLoggedIn',"false");
    this.localStorage.store('loginDetails',"");
    this.router.navigate(['']);
   }

  ngOnInit() {
  }

}

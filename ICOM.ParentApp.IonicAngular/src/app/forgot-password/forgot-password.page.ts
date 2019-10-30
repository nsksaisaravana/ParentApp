import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  userIdValue1:string='';

  constructor() { }

  ngOnInit() {
  }

  changePassword(){
    console.log("Test");
  }

}

import { Component, OnInit } from '@angular/core';
import { ChangepasswordService } from '../inside/changepassword/services/changepassword.service';
import { UserAuthenticationService } from '../services/user-authentication.service';
import {Router,ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-change-first-time-password',
  templateUrl: './change-first-time-password.page.html',
  styleUrls: ['./change-first-time-password.page.scss'],
})
export class ChangeFirstTimePasswordPage implements OnInit {
  passwordValue1:string='';
  passwordValue2:string='';
  constructor(private changepasswordService:ChangepasswordService,private userAuthenticationService:UserAuthenticationService,
    private router:Router,private alertController:AlertController) { }

  ngOnInit() {
  }

  async changePassword(){
    if(this.validatePassword()){
      await this.changepasswordService.changePassword(this.userAuthenticationService.userDetails.Title,this.passwordValue1,"-").toPromise();
      this.persentAlert("Success","Password changed successfully","");
      this.router.navigate(['/inside/menus/home']);
    }
  }

  validatePassword(){
    if(this.passwordValue1 != this.passwordValue2){
      this.persentAlert("Error","Password not matching","");
      return false;
    }else{
      return true;
    }
  }

  async persentAlert(typeofMessage,header,detail){
    const alert=await this.alertController.create({
      header:typeofMessage,
      subHeader:header,
      message:detail,
      buttons:['OK']
    });

    await alert.present();
  }

}

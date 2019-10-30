import { Component, OnInit } from '@angular/core';
import {ChangepasswordService} from './services/changepassword.service';
import {AlertController} from '@ionic/angular';
import {UserAuthenticationService} from '../../services/user-authentication.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  passwordValue1:string='';
  passwordValue2:string='';
  currentPasswordValue:string='';
  constructor(private changepasswordService:ChangepasswordService,private alertController:AlertController,
    private userAuthenticationService:UserAuthenticationService,private router:Router) { }

  ngOnInit() {
  }

  async changePassword(){
    if(this.validatePassword()){
      try{
        await this.changepasswordService.changePassword(this.userAuthenticationService.userDetails.Title,this.passwordValue1,this.currentPasswordValue).toPromise();
        await this.persentAlert("Success","Password changed successfully","");
        this.router.navigate(['/inside/menus/home']);
      }catch{
        await this.persentAlert("Fail","Current Password is wrong","");
      }

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

  cancelChangePassword(){
    this.router.navigate(['/inside/menus/home']);
  }
}

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {LoginService} from './services/login.service'
import {AlertController,Platform} from '@ionic/angular'
import {UserAuthenticationService} from '../services/user-authentication.service'
import { SessionStorageService,LocalStorageService} from 'ngx-webstorage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  subscription : any ;
  isShowSpinner:boolean=false;
  loginDetails:any=[];  
  userName:string='';
  passwordValue:string='';
  alreadyLoggedIn:boolean=true;
  constructor(private router:Router,private loginService:LoginService,private alertController:AlertController,
    private userAuthenticationService:UserAuthenticationService,private sessionStorage:SessionStorageService,
    private localStorage:LocalStorageService,public loadingController: LoadingController,
    private platform: Platform) { }

    async login(){
    this.isShowSpinner=true;
    await this.presentLoading("Logging In");
    this.authenticateLoginUser()
  }

  async ngOnInit() {
    await this.presentLoading("Loading");
    this.localStorageExistsLoginToHomePage();
    this.dissMissLoading();
    //this.alreadyLoggedIn=false;
  }

  async authenticateLoginUser(){
    this.loginDetails=await this.loginService.validateUserIdAndPassword(this.userName,this.passwordValue).toPromise().then(loginDetails=>{
      //this.sessionStorage.store('isUserLoggedIn',"true");
      this.localStorage.store('isUserLoggedIn',"true");
      //this.sessionStorage.store('loginDetails',JSON.stringify(loginDetails));
      this.localStorage.store('loginDetails',JSON.stringify(loginDetails));
      this.userAuthenticationService.isUserLoggedIn=true;
      this.userAuthenticationService.userDetails=loginDetails;
      this.userAuthenticationService.currentUserToken=this.userAuthenticationService.userDetails.Token;
      if(this.userAuthenticationService.userDetails.RedirectUserToChangePassword==true){
        this.router.navigate(['/changeFirstTimePassword']);
        this.dissMissLoading();
      }else{
        this.router.navigate(['/inside/menus/home']);
        this.dissMissLoading();
      }
      this.isShowSpinner=false;
    }).catch(error=>{
      this.isShowSpinner=false;
      console.log(error);
      this.persentAlert("Login failed","",error.error.ExceptionMessage);
      this.dissMissLoading();
    })

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

  async presentLoading(message:string) {
    const loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
    
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  localStorageExistsLoginToHomePage(){
    let localIsUserLoggedIn= this.localStorage.retrieve('isUserLoggedIn');
    if(localIsUserLoggedIn && localIsUserLoggedIn=='true'){
      this.router.navigate(['/inside/menus/home']);
    }else{
      this.alreadyLoggedIn=false;
    }
  }


  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
      this.subscription.unsubscribe();
  }

 

}

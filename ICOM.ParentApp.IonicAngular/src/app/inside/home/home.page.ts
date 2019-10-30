import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {FcmService} from '../../services/fcm.service';
import {ToastService} from '../../services/toast.service';
import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomeService } from './services/home.service';
import { IPersonTokens } from './model/homeInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subscription : any ;
  personToken:IPersonTokens={} as any;

  constructor(private router:Router, private fcm:FcmService,
    private toastService:ToastService,private platform: Platform,private splashScreen: SplashScreen,
    private statusBar: StatusBar,private userAuthenticationService:UserAuthenticationService,private homeService:HomeService) { }

  ngOnInit() {
    this.initializeApp();
    this.notificationSetup();
  }

  navigateCalendar(){
    this.router.navigate(['/inside/menus/calendar']);
  }

  navigateNotification(){
    this.router.navigate(['/inside/menus/notification']);
  }

  navigateForms(){
    this.router.navigate(['/inside/menus/forms']);
  }

  navigateNewsletter(){
    this.router.navigate(['/inside/menus/newsletter']);
  }

  navigateAbsence(){
    this.router.navigate(['/inside/menus/absence']);
  }

  navigateSocial(){
    window.open("https://www.facebook.com/pages/Islamic-College-of-Melbourne/257112307727132/");
  }

  navigateWebsite(){
    window.open("http://www.icom.vic.edu.au/");
  }

  navigateContact(){
    this.router.navigate(['/inside/menus/contact']);
  }

  navigateSettings(){
    this.router.navigate(['/inside/menus/settings']);
  }

  private notificationSetup(){
    let loginUserName=this.userAuthenticationService.userDetails.Title;
    this.fcm.getToken(loginUserName).then(res=>{
      //this.fcm.deviceToken='d17ZPAvRqw0:APA91bEH_2H9vo_Q10UIAd_fNMRRcGhh5afZRtkxFxZIx5g8IS12jgzbGeW99O276lex3PVc3_Q4hD1PD-Hc3GNYQM7eh1e9qDc5xW6y3pGvOyKJNK744H8pcfxjJz0uCZihVpBIa1Bb'
      if(this.fcm.deviceToken==null) return;
      this.personToken.userName=loginUserName;
      this.personToken.token=this.fcm.deviceToken;
      this.saveFCMToken();
    })
    this.fcm.onNotifications().subscribe(
      (msg)=>{
        this.toastService.presentToast(msg.body);
    });
    

  }

  async saveFCMToken(){
    await this.homeService.saveFirebaseToken(this.personToken).toPromise();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // if(this.platform.is('cordova')){
      //   //this.setupPush();
      // }
      // //this.setupPush();
    });
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

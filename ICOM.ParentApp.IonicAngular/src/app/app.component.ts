import { Component } from '@angular/core';

import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import {SwPush} from "@angular/service-worker";

import {FcmService} from './services/fcm.service';
import {ToastService} from './services/toast.service';
//import {Observable,Subscribable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private alertCtrl:AlertController,
    //private oneSignal:OneSignal,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swPush:SwPush,
    private fcm:FcmService,
    private toastService:ToastService
  ) {
    //this.initializeApp();
    //this.notificationSetup();
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

  private notificationSetup(){
    //this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg)=>{
        this.toastService.presentToast(msg.body);
      });
  }

  subscribeToNotifications(){
    this.swPush.requestSubscription({
      serverPublicKey:""
    })
    .then(sub=> {
      console.log("Notification Subscription",sub);
    })
    .catch(err=>console.error("Could not subscribe to notifications",err));
  }

  // setupPush(){
  //   this.oneSignal.startInit('04f036a5-3a24-4401-b2e1-1e4700a0f3d6','1078664196243');
  //   this.oneSignal.handleNotificationReceived().subscribe(data=>{
  //     console.log('we received a push: ',data);
  //   });
  //   this.oneSignal.handleNotificationOpened().subscribe(data=>{
  //     console.log('we opened a push:',data);
  //     // let message=data.notification.payload.body;
  //     // let title=data.notification.payload.title;
  //     // let alert=this.alertCtrl.create({
  //     //   header:title,
  //     //   subHeader:message,
  //     //   buttons:[
  //     //     {
  //     //       text:'Close',
  //     //       role:'cancel'
  //     //     }
  //     //   ]
  //     // })
  //     // return alert.present()
  //     this.presentAlert();
  //   });

  //   this.oneSignal.endInit();
  // }

  async  presentAlert() {
    const alertController = document.querySelector('ion-alert-controller');
    await alertController.componentOnReady();
  
    const alert = await alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  
}

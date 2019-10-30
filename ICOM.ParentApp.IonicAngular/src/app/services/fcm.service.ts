import { Injectable } from '@angular/core';
import {Firebase} from '@ionic-native/firebase/ngx'
import { Platform,AlertController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class FcmService {

    deviceToken:string="";

    constructor(private firebase:Firebase,
            private afs:AngularFirestore,
            private platform:Platform) 
    { 

    }

    async getToken(userName){
        let token;

        if(this.platform.is('android')){
            token= await this.firebase.getToken();
        }

        if(this.platform.is('ios')){
            token= await this.firebase.getToken();
            await this.firebase.grantPermission();
        }
        this.deviceToken=token;
        this.saveToken(token,userName);
    }

    private saveToken(token,userName){
        if(!token) return;

        const devicesRef=this.afs.collection('devices');
        const data={
            token,
            userid:userName
        };
        return devicesRef.doc(token).set(data);
    }

    onNotifications(){
        return this.firebase.onNotificationOpen();
    }

  }
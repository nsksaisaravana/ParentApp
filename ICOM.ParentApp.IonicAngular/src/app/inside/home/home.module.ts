import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

//Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {Firebase} from '@ionic-native/firebase/ngx'
import {FcmService} from '../../services/fcm.service';
import {ToastService} from '../../services/toast.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { HomeService } from './services/home.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle as farUserCircle } from '@fortawesome/free-regular-svg-icons';

library.add(farUserCircle);


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

const config = {
  apiKey: "AIzaSyAVe9bibWmGn1qVGVPzQCUUgMLnpkFejjk",
  authDomain: "school-parent-app-223722.firebaseapp.com",
  databaseURL: "https://school-parent-app-223722.firebaseio.com",
  projectId: "school-parent-app-223722",
  storageBucket: "school-parent-app-223722.appspot.com",
  messagingSenderId: "985500189898"
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [
    ToastService,
    Firebase,
    FcmService,
    UserAuthenticationService,
    HomeService,
    StatusBar,
    SplashScreen,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

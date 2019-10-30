import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserAuthenticationService } from './services/user-authentication.service';
import {AuthGuardService} from './services/auth-guard.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import {OneSignal} from '@ionic-native/onesignal/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http';

//Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {Firebase} from '@ionic-native/firebase/ngx'
import {FcmService} from './services/fcm.service';
import {ToastService} from './services/toast.service';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe'
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import {library} from '@fortawesome/fontawesome-svg-core';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

// library.add(faCoffee);

const config = {
  apiKey: "AIzaSyAVe9bibWmGn1qVGVPzQCUUgMLnpkFejjk",
  authDomain: "school-parent-app-223722.firebaseapp.com",
  databaseURL: "https://school-parent-app-223722.firebaseio.com",
  projectId: "school-parent-app-223722",
  storageBucket: "school-parent-app-223722.appspot.com",
  messagingSenderId: "985500189898"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    BrowserAnimationsModule,HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), 
    NgxWebstorageModule.forRoot(),
    // FontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
    //BrowserAnimationsModule, NgbModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserAuthenticationService,
    AuthGuardService,
    TokenInterceptorService,
    FcmService,
    ToastService,
    Firebase
    // OneSignal,{
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:TokenInterceptorService,
    //   multi:true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

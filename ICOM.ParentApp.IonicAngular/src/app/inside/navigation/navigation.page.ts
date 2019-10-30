import { Component, OnInit } from '@angular/core';
import {UserAuthenticationService} from '../../services/user-authentication.service';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserCircle as farUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons';
//import {faCoffee} from '@fortawesome/free-solid-svg-icons';
library.add(faUserCircle);
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  public appPages=[];
  public filteredPages=[];
  loginUserName:string='';
  // faCoffee=faCoffee;
  constructor(private userAuthenticationService:UserAuthenticationService) { 
    //this.initializeApp();
    //this.initializeAppPages();
    this.userAuthenticationService.verifyLogin();
    console.log(this.userAuthenticationService.userDetails)
    this.userAuthenticationService.userDetails.IsAdmin==true?this.initializeAdminPages():this.initializeAppPages();
    this.loginUserName=this.userAuthenticationService.userDetails.UserFullName;
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  getItems(event:any){
    const val=event.target.value;
    if(val && val.trim() !=''){
      this.filteredPages=this.appPages;
      this.filteredPages = this.filteredPages.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.filteredPages=this.appPages;
    }
  }

  initializeAdminPages(){
    this.appPages = [
      {
        title: 'Home',
        url: '/inside/menus/home',
        icon: 'home'
      },
      {
        title: 'Calendar',
        url: '/inside/menus/calendar',
        icon: 'calendar'
      },
      {
        title: 'Notification',
        url: '/inside/menus/notification',
        icon: 'notifications'
      },
      {
        title: 'Forms',
        url: '/inside/menus/forms',
        icon: 'logo-twitch'
      },
      {
        title: 'News',
        url: '/inside/menus/newsletter',
        icon: 'albums'
      },
      {
        title: 'Absence',
        url: '/inside/menus/absence',
        icon: 'analytics'
      }
      ,
      {
        title: 'Facebook',
        url: '/inside/menus/facebook',
        icon: 'logo-facebook'
      },
      {
        title: 'About Us',
        url: '/inside/menus/aboutus',
        icon: 'logo-xbox'
      }
      ,
      {
        title: 'Contact',
        url: '/inside/menus/contact',
        icon: 'contacts'
      },
      {
        title: 'Settings',
        url: '/inside/menus/settings',
        icon: 'settings'
      }
      ,
      {
        title: 'Maintain News',
        url: '/inside/menus/maintainnewsletter',
        icon: 'paper'
      },
      {
        title: 'Maintain Notifications',
        url: '/inside/menus/maintainnotifications',
        icon: 'megaphone'
      },
      // {
      //   title: 'Maintain UpComingEvents',
      //   url: '/inside/menus/maintainupcomingevents',
      //   icon: 'albums'
      // },
      {
        title: 'Logout',
        url: '/inside/menus/logout',
        icon: 'close'
      }
    ];
    this.filteredPages=this.appPages;
  }

  initializeAppPages(){
    this.appPages = [
      {
        title: 'Home',
        url: '/inside/menus/home',
        icon: 'home'
      },
      {
        title: 'Calendar',
        url: '/inside/menus/calendar',
        icon: 'calendar'
      },
      {
        title: 'Notification',
        url: '/inside/menus/notification',
        icon: 'notifications'
      },
      {
        title: 'Forms',
        url: '/inside/menus/forms',
        icon: 'school'
      },
      {
        title: 'News',
        url: '/inside/menus/newsletter',
        icon: 'albums'
      },
      {
        title: 'Absence',
        url: '/inside/menus/absence',
        icon: 'analytics'
      }
      ,
      {
        title: 'Facebook',
        url: '/inside/menus/facebook',
        icon: 'logo-facebook'
      },
      {
        title: 'About Us',
        url: '/inside/menus/aboutus',
        icon: 'logo-xbox'
      }
      ,
      {
        title: 'Contact',
        url: '/inside/menus/contact',
        icon: 'contacts'
      }
      ,
      {
        title: 'Settings',
        url: '/inside/menus/settings',
        icon: 'settings'
      }
      ,
      {
        title: 'Logout',
        url: '/inside/menus/logout',
        icon: 'close'
      }
    ];
    this.filteredPages=this.appPages;
  
  }

  ngOnInit() {

  }



}

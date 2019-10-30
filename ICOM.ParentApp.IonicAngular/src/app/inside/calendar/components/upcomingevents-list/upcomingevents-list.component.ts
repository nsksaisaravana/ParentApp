import { Component, OnInit,Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment'
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upcomingevents-list',
  templateUrl: './upcomingevents-list.component.html',
  styleUrls: ['./upcomingevents-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpcomingeventsListComponent implements OnInit {

  upcomingEventDetails:any=[];
  eventMonths:any=[];

  @Output() clickUpComingChild: EventEmitter<any> = new EventEmitter<any>();


  constructor(private calendarService:CalendarService,public loadingController: LoadingController,
    private userAuthenticationService:UserAuthenticationService,private router:Router) { }

  ngOnInit() {
    // if(this.calendarService.upcomingEventDetails <=0){
    //   this.fetchUpComingEventList();
    // }else{
    //   this.upcomingEventDetails=this.calendarService.upcomingEventDetails;
    //   this.eventMonths=this.calendarService.eventMonths;
    // }
    this.fetchUpComingEventList();
  }

  async fetchUpComingEventList(){
    try{
    
      await this.presentLoading();
      this.upcomingEventDetails=await this.calendarService.fetchUpcomingEvents().toPromise();

      console.log(this.upcomingEventDetails);
      this.calendarService.upcomingEventDetails=this.upcomingEventDetails;
      this.eventMonths=Array.from(new Set(this.upcomingEventDetails.map((itemInArray) => itemInArray.Month)));
      this.calendarService.eventMonths=this.eventMonths;
      //this.upcomingEvent.EventStartTime=moment.utc(new Date()).local().format(); 
      this.upcomingEventDetails.forEach((item,index) => {
        this.upcomingEventDetails[index]["EventStartTime"]=moment.utc(item.EventStartTime).local().format(); 
        this.upcomingEventDetails[index]["EventEndTime"]=moment.utc(item.EventEndTime).local().format(); 
        this.upcomingEventDetails[index]["EventDate"]=moment.utc(item.EventDate).local().format(); 
      });
      this.dissMissLoading()
    }
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
    // for(let month of this.eventMonths){
    //   var eventDetailsByMonth=this.upcomingEventDetails.filter(docs=>docs.Month==month);
    // }
  }

  upcomingItemClick(upcomingItem:any){
    //console.log(upcomingItem);
    //this.clickUpComingChild.emit(upcomingItem);
  }

  returnEventCountByMonth(monthName:string){
    let eventDetailsByMonth=this.upcomingEventDetails.filter(docs=>docs.Month==monthName);
    return eventDetailsByMonth.length;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Calendar',
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}

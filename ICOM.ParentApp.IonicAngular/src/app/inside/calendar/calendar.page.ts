import { Component, OnInit,ViewChild  } from '@angular/core';
import { UpcomingeventsListComponent } from './components/upcomingevents-list/upcomingevents-list.component';
import { UpcomingeventsDetailComponent } from './components/upcomingevents-detail/upcomingevents-detail.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';

//declare var google;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  isUpcomingEventList:boolean=true;

  panels = [
    {
    title: 'panel 1',
    content: 'content 1'
  },
  {
    title: 'panel 2',
    content: 'content 2'
  },
  ]

  @ViewChild(UpcomingeventsListComponent ,{static:false}) upcomingEvent: UpcomingeventsListComponent;
  @ViewChild(UpcomingeventsDetailComponent ,{static:false}) upcomingEventDetail: UpcomingeventsDetailComponent; 
  @ViewChild(GoogleMapsComponent ,{static:false}) googleMap: GoogleMapsComponent; 
  constructor() { }

  ngOnInit() {
  }

  clickUpcomingParent($event:any){
    //console.log($event);
    this.isUpcomingEventList=false;
    this.upcomingEventDetail.upcomingEventDetails=$event;
    // this.googleMap.latitude=parseFloat($event.Latitude);
    // this.googleMap.longitude=parseFloat($event.Longitude);
    // this.googleMap.loadMap();
  }

  clickUpComingDetailParent($event){
    console.log($event);
    this.isUpcomingEventList=true;
  }


}

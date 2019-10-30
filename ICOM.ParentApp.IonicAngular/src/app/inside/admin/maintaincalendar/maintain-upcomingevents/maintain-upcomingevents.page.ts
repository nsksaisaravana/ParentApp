import { Component, OnInit,ViewChild } from '@angular/core';
import { UpcomingeventsListComponent, PopUpDialog } from '../components/upcomingevents-list/upcomingevents-list.component';
import { UpcomingeventsNeweditComponent } from '../components/upcomingevents-newedit/upcomingevents-newedit.component';

@Component({
  selector: 'app-maintain-upcomingevents',
  templateUrl: './maintain-upcomingevents.page.html',
  styleUrls: ['./maintain-upcomingevents.page.scss'],
})
export class MaintainUpcomingeventsPage implements OnInit {
  showUpcomingEventsList:boolean=true;

  @ViewChild(UpcomingeventsListComponent ,{static:false}) upcomingEventListComponent: UpcomingeventsListComponent;
  @ViewChild(UpcomingeventsNeweditComponent ,{static:false}) upcomingEventNewEditComponent: UpcomingeventsNeweditComponent;
  @ViewChild(PopUpDialog ,{static:false}) popUpDialogComponent: PopUpDialog;
  constructor() { }

  ngOnInit() {
  }

  clickMaintainEventListParent($event){
    this.showUpcomingEventsList=false;
    if($event){
      this.upcomingEventNewEditComponent.upcomingEvent=$event;
    }else{
      this.upcomingEventNewEditComponent.clearUpcomingEvent();
    }
  }

  clickMaintainEventDetailParent($event){
    if($event=='Saved'){
      this.upcomingEventListComponent.fetchUpComingEventsForMaintenance();
    }
    this.showUpcomingEventsList=true;
  }

}

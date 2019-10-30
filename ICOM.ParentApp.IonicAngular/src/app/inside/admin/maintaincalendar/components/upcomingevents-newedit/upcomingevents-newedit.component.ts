import { Component, OnInit,NgZone, ElementRef, ViewChild,Output,EventEmitter } from '@angular/core';
import { IUpcomingEvents } from '../../model/upcomingevent';
//import { } from 'googlemaps';
//import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment'
import { MaintainUpcomingeventsService } from '../../services/maintain-upcomingevents.service';

@Component({
  selector: 'app-upcomingevents-newedit',
  templateUrl: './upcomingevents-newedit.component.html',
  styleUrls: ['./upcomingevents-newedit.component.scss']
})
export class UpcomingeventsNeweditComponent implements OnInit {
  upcomingEvent:IUpcomingEvents ={} as any;
  public latitude: number;
  public longitude: number;
  //public searchControl: FormControl;
  public zoom: number;
  @ViewChild('search',{static:false}) eventAddressControl: ElementRef;
  @Output() clickMaintainEventDetailChild: EventEmitter<any> = new EventEmitter<any>();
  //constructor( private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private maintainUpcomingEventService:MaintainUpcomingeventsService) { }

  constructor( private ngZone: NgZone,private maintainUpcomingEventService:MaintainUpcomingeventsService) { }

  ngOnInit() {
    this.upcomingEvent.EventStartTime=moment.utc(new Date()).local().format();    //new Date().toISOString();
    this.upcomingEvent.EventEndTime=moment.utc(new Date()).local().format();
    this.upcomingEvent.EventDate=moment.utc(new Date()).local().format();
    //this.loadGooleMapPlaces();
  }

  async saveUpcomingEvent(){
    console.log(this.upcomingEvent);
    this.upcomingEvent.EventDate=moment.utc(this.upcomingEvent.EventDate).local().format();
    this.upcomingEvent.EventEndTime=moment.utc(this.upcomingEvent.EventEndTime).local().format();
    this.upcomingEvent.EventStartTime=moment.utc(this.upcomingEvent.EventStartTime).local().format();
    if(this.upcomingEvent.Id==0){
      await this.maintainUpcomingEventService.saveNewUpComingEvent(this.upcomingEvent).toPromise();
    }else{
      await this.maintainUpcomingEventService.updateUpComingEvenet(this.upcomingEvent,this.upcomingEvent.Id).toPromise();
    }
    this.clickMaintainEventDetailChild.emit("Saved");
  }

  clearUpcomingEvent(){
    this.upcomingEvent.Id=0;
    this.upcomingEvent.EventAddress='';
    this.upcomingEvent.Title='';
    this.upcomingEvent.EventStartTime=moment.utc(new Date()).local().format();    //new Date().toISOString();
    this.upcomingEvent.EventEndTime=moment.utc(new Date()).local().format();
    this.upcomingEvent.EventDate=moment.utc(new Date()).local().format();
    this.upcomingEvent.EventDesc='';
    this.upcomingEvent.EventShortDesc='';
  }

  exitUpComingEvent(){
    this.clickMaintainEventDetailChild.emit("Go Back");
  }


  // loadGooleMapPlaces(){
  //    //load Places Autocomplete
  //    this.mapsAPILoader.load().then(() => {
  //     let nativeHomeInputBox =this.eventAddressControl.nativeElement;
  //     let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
  //         types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //         this.ngZone.run(() => {
  //             //get the place result
  //             let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //             //verify result
  //             if (place.geometry === undefined || place.geometry === null) {
  //                 return;
  //             }

  //             //set latitude, longitude and zoom
  //             this.latitude = place.geometry.location.lat();
  //             this.longitude = place.geometry.location.lng();
  //             this.zoom = 12;
  //             console.log(this.latitude);
  //             console.log(this.longitude);
  //         });
  //       });
  //     });
  // }

}

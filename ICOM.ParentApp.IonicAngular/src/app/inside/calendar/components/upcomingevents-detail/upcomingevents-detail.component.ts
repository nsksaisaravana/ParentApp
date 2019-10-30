import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {IUpcomingEvent} from '../../services/calendar.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-upcomingevents-detail',
  templateUrl: './upcomingevents-detail.component.html',
  styleUrls: ['./upcomingevents-detail.component.scss']
})
export class UpcomingeventsDetailComponent implements OnInit {
  
  upcomingEventDetails:IUpcomingEvent={} as any;
  @Output() clickUpComingDetailChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _sanitizer:DomSanitizer) { }

  ngOnInit() {
    
  }

  showNewsletterList(){
    this.clickUpComingDetailChild.emit("Go back");
  }

}

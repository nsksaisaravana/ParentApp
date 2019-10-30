import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

//declare var google;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('map',{static:false}) mapElement:ElementRef;
  map:any;
  latitude:number;
  longitude:number;
  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let latLng=new google.maps.LatLng(this.latitude,this.longitude);
    let mapOptions={
      center:latLng,
      zoom:16,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    this.map=new google.maps.Map(this.mapElement.nativeElement,mapOptions);
    let goldenGatePosition = {lat: this.latitude,lng: this.longitude};
	  let marker = new google.maps.Marker({
			position: goldenGatePosition,
			map: this.map,
			title: 'Golden Gate Bridge'
			});
  }

}

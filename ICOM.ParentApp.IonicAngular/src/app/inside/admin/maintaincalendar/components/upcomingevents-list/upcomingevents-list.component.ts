import { Component, OnInit,Output,EventEmitter,Inject,ViewChild } from '@angular/core';
import { MaintainUpcomingeventsService } from '../../services/maintain-upcomingevents.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment'
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../../../services/user-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcomingevents-list',
  templateUrl: './upcomingevents-list.component.html',
  styleUrls: ['./upcomingevents-list.component.scss']
})
export class UpcomingeventsListComponent implements OnInit {
  dataSource:any= new MatTableDataSource;
  displayedColumns: string[] = ['Title', 'EventDate', 'EventStartTime', 'EventEndTime','EventShortDesc','EventAddress','Actions'];
  @Output() clickMaintainEventListChild: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;



  constructor(private maintainUpComingEventsService:MaintainUpcomingeventsService,public dialog: MatDialog,
    public loadingController: LoadingController,private router:Router ,private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit() {
    //this.displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    //this.dataSource = ELEMENT_DATA;
    this.fetchUpComingEventsForMaintenance();
    this.dataSource.paginator = this.paginator;
  }

  itemClickedForEdit(itemDetails){
    console.log(itemDetails);
    this.clickMaintainEventListChild.emit(itemDetails);
  }

  async fetchUpComingEventsForMaintenance(){
    try{
      await this.presentLoading();
      let upcomingEvents:any =await this.maintainUpComingEventsService.fetchUpComingEvents().toPromise();
      upcomingEvents.forEach((item,index) => {
        upcomingEvents[index]["EventStartTime"]=moment.utc(item.EventStartTime).local().format(); 
        upcomingEvents[index]["EventEndTime"]=moment.utc(item.EventEndTime).local().format(); 
        upcomingEvents[index]["EventDate"]=moment.utc(item.EventDate).local().format(); 
      });

      this.dataSource=upcomingEvents;
      this.dissMissLoading();
      console.log(upcomingEvents);
    }
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
  }

  stringAsDate(dateStr) {
    dateStr=moment(dateStr).format();
    return new Date(dateStr);
  }

  addNewUpcomingEventItem(){
    this.clickMaintainEventListChild.emit(undefined);
  }

  itemClickedForDelete(itemDetails){
    const dialogRef = this.dialog.open(PopUpDialog, {
      width: '250px',
      data: {itemId: itemDetails.Id,eventName:itemDetails.Title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.fetchUpComingEventsForMaintenance();
    });
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


@Component({
  selector: 'popUpDialog',
  templateUrl: 'popUpDialog.html',
})
export class PopUpDialog {
  onDelete = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<PopUpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private upcomingEventService:MaintainUpcomingeventsService) {}

  async onDeleteClick() {
    await this.upcomingEventService.deleteUpComingEvent(this.data.itemId).toPromise();
    this.dialogRef.close();
    this.onDelete.emit();
    console.log(this.data.itemId)
  }

}

export interface DialogData {
  itemId: number;
  eventName:string;
}

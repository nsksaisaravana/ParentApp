import { Component, OnInit,Output,EventEmitter,Inject } from '@angular/core';
import { MaintainNotificationsService } from '../../services/maintain-notifications.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment'

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  dataSource:any;
  notificationDetails:any;
  displayedColumns: string[] = ['Title', 'ShortDesc', 'FromDate','ToDate','Actions'];
  @Output() clickMaintainNotificationListChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(private maintainNotificationService:MaintainNotificationsService,public dialog: MatDialog) { }

  ngOnInit() {
    //this.dataSource = ELEMENT_DATA;
    this.fetchNotificationDetails();
  }

  itemClickedForEdit(itemDetails){
    console.log(itemDetails);
    this.clickMaintainNotificationListChild.emit(itemDetails);
  }

  async fetchNotificationDetails(){
    this.notificationDetails=await this.maintainNotificationService.fetchNotifications().toPromise();
    console.log(this.notificationDetails);
  }

  async deleteNotification(){
    await this.maintainNotificationService.deleteNotification(1).toPromise();
  }

  addNewNotifications(){
    this.clickMaintainNotificationListChild.emit(undefined);
  }

  itemClickedForDelete(itemDetails){
    const dialogRef = this.dialog.open(MaintainNotificationPopUpDialog, {
      width: '250px',
      data: {itemId: itemDetails.Id,notificationTitle:itemDetails.Title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.fetchNotificationDetails();
    });
  }
}

  @Component({
    selector: 'maintainNotificationPopUpDialog',
    templateUrl: 'maintainNotificationPopUpDialog.html',
  })
  export class MaintainNotificationPopUpDialog {
    onDelete = new EventEmitter();
    constructor(
      public dialogRef: MatDialogRef<MaintainNotificationPopUpDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,private upcomingEventService:MaintainNotificationsService) {}
  
    async onDeleteClick() {
      await this.upcomingEventService.deleteNotification(this.data.itemId).toPromise();
      this.dialogRef.close();
      this.onDelete.emit();
      console.log(this.data.itemId)
    }
  
  }
  
  export interface DialogData {
    itemId: number;
    notificationTitle:string;
  }




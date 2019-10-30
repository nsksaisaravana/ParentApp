import { Component, OnInit ,Output,EventEmitter,Inject} from '@angular/core';
import { MaintainNewsletterserviceService } from '../../services/maintain-newsletterservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { INewsletter } from '../../model/newsletter';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-newsletterlist',
  templateUrl: './newsletterlist.component.html',
  styleUrls: ['./newsletterlist.component.scss']
})
export class NewsletterlistComponent implements OnInit {
  dataSource:any;
  newsLetterItems:any;
  displayedColumns: string[] = ['Title',   'IsPublished','actions'];
  @Output() clickMaintainNewsletterChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(private maintaienanceNewsLetter:MaintainNewsletterserviceService,public dialog: MatDialog,public loadingController: LoadingController) { }

  ngOnInit() {
    
    this.fetchNewsLetterForMaintenance();
  }

  itemClickedForEdit(itemDetails){
    console.log(itemDetails);
    this.clickMaintainNewsletterChild.emit(itemDetails);
  }

  async fetchNewsLetterForMaintenance(){
    await this.presentLoading();
    this.newsLetterItems=await this.maintaienanceNewsLetter.fetchNewsLetters().toPromise();
    this.dataSource = this.newsLetterItems;
    this.dissMissLoading();
    console.log(this.newsLetterItems);
  }

  async deleteNewsletter(){
    await this.maintaienanceNewsLetter.deleteNewsLetter(1).toPromise();
  }

  addNewNewsLetterItem(){
    this.clickMaintainNewsletterChild.emit(undefined);
  }

  itemClickedForDelete(itemDetails){
    const dialogRef = this.dialog.open(MaintainNewsLetterPopUpDialog, {
      width: '250px',
      data: {itemId: itemDetails.Id,newsLetterTitle:itemDetails.Title,newsLetterDocumentId:itemDetails.NewsLetterDocumentId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.fetchNewsLetterForMaintenance();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Newsletters',
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}


@Component({
  selector: 'maintainNewsLetterPopUpDialog',
  templateUrl: 'maintainNewsLetterPopUp.html',
})
export class MaintainNewsLetterPopUpDialog {
  onDelete = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<MaintainNewsLetterPopUpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private maintainNewsLetterService:MaintainNewsletterserviceService) {}

  async onDeleteClick() {
    await this.maintainNewsLetterService.deleteNewsLetter(this.data.itemId).toPromise();
    await this.maintainNewsLetterService.deleteNewsLetterDocument(this.data.newsLetterDocumentId).toPromise();
    this.dialogRef.close();
    this.onDelete.emit();
    console.log(this.data.itemId)
  }

}

export interface DialogData {
  itemId: number;
  newsLetterTitle:string;
  newsLetterDocumentId:number;
}

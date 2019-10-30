import { Component, OnInit,Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-notifications-detail',
  templateUrl: './notifications-detail.component.html',
  styleUrls: ['./notifications-detail.component.scss']
})
export class NotificationsDetailComponent implements OnInit {

  notificationDetailTitle:string='';
  notificationDetailedDescription:any;
  notificationTitle:string='';
  notificationUpdatedDate:string='';
  notificationDesc:string='';
  notificationPdfPath:string='';
  notificationId:number=0;
  notificationFileName:string='';
  documentExists:string='';

  @Output() clickNotificationDetailChild: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewer',{static:false}) viewer: ElementRef;
  constructor(private file:File,
    private document:DocumentViewer,private notificationService:NotificationService) { }

  ngOnInit() {
  }

  showNotificationList(){
    this.clickNotificationDetailChild.emit("Go Back");
  }

  downloadFile(){
    this.downloadAndShowNewsLetterPdf(this.notificationId);
  }

  async downloadAndShowNewsLetterPdf(id){
    let pdfBuffer:any;
    pdfBuffer=await this.notificationService.downloadNotificationPdf(id).toPromise();
    var fileURL = URL.createObjectURL(pdfBuffer);
    console.log(fileURL);

    //let buffer = imageBlog.arrayBuffer();
    let pdfBlob = new Blob([pdfBuffer], {type: 'application/pdf'});
    this.file.writeFile(this.file.dataDirectory, "Test.pdf", pdfBlob, {replace: true}).then(c => {

      // this.document.viewDocument(this.file.dataDirectory+"Test.pdf", "application/pdf",
      //   {print: {enabled: true}, bookmarks: {enabled: true}, email: {enabled: true}, title: "Test"});
      PDFTron.NativeViewer({
        l: 'Islamic College Of Melbourne(icom.vic.edu.au):ENTERP:ICOM Parent App::IA:AMS(20200820):0867C5A01FC7A4D0E333FD7820612FCD7EDBA5C89DE51DFA54E510F67AD4BEF5C7',
        initialDoc: this.file.dataDirectory+"Test.pdf",
        disabledElements: [
          'thumbnailsButton',
          'listsButton',
          'toolsButton',
          'moreItemsButton'
          ]
        }, this.viewer);
      
    });
  }

}

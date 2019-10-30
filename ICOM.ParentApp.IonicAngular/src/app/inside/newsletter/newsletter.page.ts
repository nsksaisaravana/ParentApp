import { Component, OnInit,ViewChild } from '@angular/core';
import { NewsletterListComponent } from './components/newsletter-list/newsletter-list.component';
import { NewsletterDetailComponent } from './components/newsletter-detail/newsletter-detail.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NewsletterService } from './services/newsletter.service';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import * as moment from 'moment'
@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.page.html',
  styleUrls: ['./newsletter.page.scss'],
})
export class NewsletterPage implements OnInit {

  isNewsLetterList:boolean=true;
  newsletterTitle:string='News';

  @ViewChild(NewsletterDetailComponent,{static:false} ) newsLetterDetail: NewsletterDetailComponent;
  @ViewChild(NewsletterListComponent,{static:false} ) newsLetterList: NewsletterListComponent; 
  
  constructor(private sanitizer: DomSanitizer,private newsLetterService:NewsletterService,private file:File,
    private document:DocumentViewer) { }

  ngOnInit() {
  }

  clickNewsLetterParent($event:any){
    console.log($event);
    this.newsletterTitle=$event.Title;
    //this.isNewsLetterList=false;
    // this.newsLetterDetail.newsLetterDetailImage=this.sanitizer.bypassSecurityTrustUrl(
    //   $event.FileDirRef.changingThisBreaksApplicationSecurity);
    this.newsLetterDetail.newsLetterDetailsPublishingContent=$event.ShortDesc;  //$event.PublishingPageContent;
    this.newsLetterDetail.newsLetterDetailTitle=$event.Title;
    this.newsLetterDetail.newsLetterId= $event.Id; //$event.NewsLetterDocumentId; //$event.Id;
    this.newsLetterDetail.newsLetterUpdatedDate=moment.utc($event.ModifiedDate).local().format("Do MMM, YYYY");
    this.newsLetterDetail.newsLetterFilename= $event.FileName;
    this.newsLetterList.downloadAndShowNewsLetterPdf($event.Id);
  }

  clickNewsLetterDetailParent($event){
    console.log($event);
    this.isNewsLetterList=true;
  }

  clickDownloadFileParent($event){
    this.downloadAndShowNewsLetterPdf($event)
  }

  async downloadAndShowNewsLetterPdf(id){
    let pdfBuffer=await this.newsLetterService.downloadNewsLetterPdf(id).toPromise();
    //this.blobUrl = URL.createObjectURL(pdfBuffer);
    //console.log(filePath);
    /*if(this.platform.is('ios')){
      let fakeName=Date.now();
      this.file.copyFile(filePath,'5-tools.pdf',this.file.dataDirectory,`${fakeName}.pdf`).then(result=>{
        this.fileOpener.open(result.nativeURL,'application/pdf');
      });
    }else if(this.platform.is('android')){
      const options:DocumentViewerOptions={
        title:'Newsletter'
      }
      this.document.viewDocument(`${filePath}/5-tools.pdf`,'application/pdf',options);
    }else{

    }*/

    //let buffer = imageBlog.arrayBuffer();
    let pdfBlob = new Blob([pdfBuffer], {type: 'application/pdf'});
    this.file.writeFile(this.file.dataDirectory, "Test.pdf", pdfBlob, {replace: true}).then(c => {

      this.document.viewDocument(this.file.dataDirectory+"Test.pdf", "application/pdf",
        {print: {enabled: true}, bookmarks: {enabled: true}, email: {enabled: true}, title: "Test"});
      
    });
  }

}

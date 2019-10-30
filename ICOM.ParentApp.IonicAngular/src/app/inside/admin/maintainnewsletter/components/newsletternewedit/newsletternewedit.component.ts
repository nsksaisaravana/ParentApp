import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MaintainNewsletterserviceService } from '../../services/maintain-newsletterservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { INewsletter } from '../../model/newsletter';


@Component({
  selector: 'app-newsletternewedit',
  templateUrl: './newsletternewedit.component.html',
  styleUrls: ['./newsletternewedit.component.scss']
})
export class NewsletterneweditComponent implements OnInit {
  richText:any;
  newsletterItem:any;
  uploadedFiles: any[] = [];
  uploadedImage:any;
  uploadedPdf:any;
  newsletter:INewsletter={} as any;
  uploadedBlob:any;
  uploadedPdfBlob:any;
  uploadedImageDetails:any;
  uploadedFileName:string;
  @Output() clickNewsLetterDetailChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(private maintaienanceNewsLetterService:MaintainNewsletterserviceService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  async saveNewsLetterEdit(){
    console.log(this.richText);
    console.log(this.uploadedFiles);
    //await this.maintaienanceNewsLetter.saveNewNewsLetter(this.newsletterItem).toPromise();
    const formData: FormData = new FormData();
    // formData.append('Image', this.uploadedBlob, "Test.png");
    // formData.append('DocPath', this.newsletter.DocumentPath);

    const formPdfData:FormData=new FormData();
    formPdfData.append('Pdf', this.uploadedPdfBlob, "Test.pdf");
    formPdfData.append('PdfDocPath', this.newsletter.PdfDocumentPath);

    if(this.newsletter.Id==0){
      // this.uploadedImageDetails= await this.maintaienanceNewsLetterService.uploadNewsLetterImage(formData).toPromise();
      // this.newsletter.DocumentPath=this.uploadedImageDetails.DocumentPath;

      this.uploadedImageDetails=await this.maintaienanceNewsLetterService.uploadNewsLetterPdf(formPdfData).toPromise();
      this.newsletter.PdfDocumentPath=this.uploadedImageDetails.DocumentPath;
      this.newsletter.NewsLetterDocumentId=this.uploadedImageDetails.Id;
      this.newsletter.FileName=this.uploadedFileName;
    }else{
      // this.uploadedImageDetails= await this.maintaienanceNewsLetterService.uploadUpdatedNewsLetterImage(formData).toPromise();

      this.uploadedImageDetails=await this.maintaienanceNewsLetterService.uploadUpdatedNewsLetterPdf(formData).toPromise();
    }
    await this.maintaienanceNewsLetterService.saveNewNewsLetter(this.newsletter).toPromise();
    this.clickNewsLetterDetailChild.emit("Saved");
  }

  async updateNewsLetterItem(){
    await this.maintaienanceNewsLetterService.updateNewsLetter(this.newsletterItem,this.newsletterItem.Id).toPromise();
  }

  async onUpload(event){
    console.log(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    let fileUrl=event.files[0].objectURL.changingThisBreaksApplicationSecurity
    this.uploadedImage= this.sanitizer.bypassSecurityTrustUrl(
      fileUrl);
    this.uploadedBlob = await fetch(fileUrl).then(r => r.blob());
    //console.log(blob);
  }

  async onUploadPdfFile(event){
    //console.log(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    let fileUrl=window.URL.createObjectURL(event.files[0]);
    this.uploadedFileName=event.files[0].name;
    this.uploadedPdf= this.sanitizer.bypassSecurityTrustUrl(
      fileUrl);
    this.uploadedPdfBlob = await fetch(fileUrl).then(r => r.blob());
    //console.log(blob);
  }

  GotoList(){
    this.clickNewsLetterDetailChild.emit("Go Back");
  }

  showPdf(){
    var pdfFile = new Blob([this.uploadedPdfBlob], {
      type: 'application/pdf'
    });
    var fileURL = URL.createObjectURL(pdfFile);
    window.open(fileURL);
  }

  clearNewsLetter(){
    console.log("Clear news letter");
  }



}

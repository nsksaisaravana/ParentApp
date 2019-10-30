import { Component, OnInit,Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { ImageUploadService } from '../../services/imageUpload.service';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { ReenrolmentService } from '../../services/reenrolment.service';
import { NewsletterService } from '../../../newsletter/services/newsletter.service';
@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit {

  forms:any;
  formsList:any;

  @Output() clickFormChild: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewer',{static:false}) viewer: ElementRef;
  constructor(private router:Router,private imageDownloadService:ImageUploadService,private file:File,
    private document:DocumentViewer,public loadingController: LoadingController,
    private userAuthenticationService:UserAuthenticationService,
    private reEnrolmentService:ReenrolmentService,private newsLetterService:NewsletterService) { }

  ngOnInit() {
    this.initializeForms()
    this.fetchFormsItems();
  }

  async fetchFormsItems(){
    await this.presentLoading('Loading Forms');
    try{
      let formsItem=await  this.newsLetterService.fetchNewsLetterItems().toPromise();
      this.forms=formsItem;
      this.forms=this.forms.filter(item=> item.NewsType=="Forms");
      this.dissMissLoading();
    }catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
  }

  initializeForms(){
    // this.forms = [
    //   {
    //     title: "Expression of Interest",
    //   },
    //   {
    //     title: "Enrolment Form",
    //   },
    //   {
    //     title: "Student Details Update",
    //   },
    //   {
    //     title: "Bus Request Form 2018",
    //   },
    //   {
    //     title: "Bus Contract Form",
    //   },
    //   {
    //     title: "Student Holiday Leave",
    //   },
    //   {
    //     title: "Complaints Form",
    //   },
    //   {
    //     title: "Parents Helpers",
    //   },
    //   {
    //     title: "Authoriy to Communicate",
    //   },
    //   {
    //     title: "Student Withdrawal Form",
    //   }
    // ]

    // this.forms = [
    //   // {
    //   //   title: "Enrolment Form",
    //   // },
    //   {
    //     title: "Student On Long Overseas Leave",
    //   },
    //   {
    //     title: "Students Change of Details Form",
    //   }
    // ]
  }

  formClick(formDetails:any){
    console.log(formDetails);
    //this.clickFormChild.emit(formDetails);
    switch(formDetails.title){
      case"Enrolment Form":{
        this.router.navigate(['/inside/menus/reenrolment']);
        break;
      }
      case"Student On Long Overseas Leave":{
        this.downloadForm("Student On Long Overseas Leave");
        break;
      }
      case"Students Change of Details Form":{
        this.downloadForm("Students Change of Details Form");
        break;
      }
    }
  }

  async downloadAndShowNewsLetterPdf(id){
    let pdfBuffer=await this.newsLetterService.downloadNewsLetterPdf(id).toPromise();
  
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

  async downloadForm(formName){
    try{
      await this.presentLoading('Loading Pdf');
      let pdfBuffer=await this.imageDownloadService.downloadFormsPdf(formName).toPromise();
    

      //let buffer = imageBlog.arrayBuffer();
      this.dissMissLoading();
      let pdfBlob = new Blob([pdfBuffer], {type: 'application/pdf'});

      // var fileURL = URL.createObjectURL(pdfBlob);
      // window.open(fileURL);

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
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }

  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async fetchNewsLetterList(){
    await this.presentLoading('Loading Newsletter');
    try{
      this.formsList=await  this.reEnrolmentService.fetchAllForms().toPromise();
    }
    catch{

    }
  }

}

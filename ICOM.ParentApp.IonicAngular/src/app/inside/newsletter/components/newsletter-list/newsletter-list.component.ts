import { Component, OnInit,Output,EventEmitter,ViewChild,ElementRef   } from '@angular/core';
import {NewsletterService} from '../../services/newsletter.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import {Router,ActivatedRoute} from '@angular/router';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
//import {PDFTron1} from 'pdftron-cordova';
//declare const WebViewer: any;
//declare var PDFTron: any;
@Component({
  selector: 'app-newsletter-list',
  templateUrl: './newsletter-list.component.html',
  styleUrls: ['./newsletter-list.component.scss']
})
export class NewsletterListComponent implements OnInit {
  newsletters=[]
  newsLetterItems:any=[];
  //PDFTron:any;
  
  newsItemDetails:any=[];
  newsTypesDetails:any=["Booklists","Newsletters","Others"];

  @Output() clickNewsLetterChild: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewer',{static:false}) viewer: ElementRef;
  //private viewer1 : any

  wvInstance: any;
  constructor(private newsLetterService:NewsletterService,private sanitizer: DomSanitizer,
    public loadingController: LoadingController,private file:File,
    private document:DocumentViewer,private router:Router,private userAuthenticationService:UserAuthenticationService) { 
      //this.viewer1.nativeElement.addEventListener('documentLoaded',this.documentLoaded);
      // var viewerElement = document.getElementById('viewer');
      // document.addEventListener("documentLoaded", this.documentLoaded.bind(this), false);
    }

  ngOnInit() {
    this.initializeAppPages();
    this.fetchNewsLetterList();
  }

  documentLoaded() {
    console.log('documentLoaded');
    //this.viewer1.setPagePresentationMode('SingleContinous');
  }
    

  initializeAppPages(){
    this.newsletters = [
      {
        title: "PRINICIPAL'S MESSAGE",
      },
      {
        title: "PARENT APP LAUNCH",
      },
      {
        title: "LOREM IPSUM DOLOR",
      },
      {
        title: "DOLOR IPSUM LOREM",
      }
    ]
  }

  newsletterItemClick(newsLetterItem:any){
    //console.log(newsLetterItem);
    this.clickNewsLetterChild.emit(newsLetterItem);
  }

  async fetchNewsLetterList(){
    await this.presentLoading('Loading Newsletter');
    try{
      this.newsLetterItems=await  this.newsLetterService.fetchNewsLetterItems().toPromise();
      // if(this.newsLetterItems && this.newsLetterItems.length >0){
      //   for (var _i = 0; _i < this.newsLetterItems.length; _i++) {
      //     let imageBlog=await this.newsLetterService.downloadNewsLetterImage(this.newsLetterItems[_i].Id).toPromise();
      //     var fileURL = URL.createObjectURL(imageBlog);
      //     console.log(fileURL);
      //     this.newsLetterItems[_i].FileDirRef= this.sanitizer.bypassSecurityTrustUrl(
      //         fileURL);
      //   }
      // }
      //this.newsLetterItems.ModifiedDate=(this.newsLetterItems.ModifiedDate).local().format("Do MMM, YYYY");
      console.log("this.newsLetterItems",);
      console.log(this.newsLetterItems);
      this.dissMissLoading();
    }catch{
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

  returnEventCountByNewsType(newsType:string){
    let eventDetailsByMonth=this.newsLetterItems.filter(docs=>docs.NewsType==newsType);
    return eventDetailsByMonth.length;
  }

  async downloadAndShowNewsLetterPdf(id){
    //30-09-2019 Sarvana commneted to test pdftron
    this.presentLoading('Loading Pdf');
    let pdfBuffer=await this.newsLetterService.downloadNewsLetterPdf(id).toPromise();
    //30-09-2019 Sarvana ends


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
    // let view1= this.PDFTron;
    // console.log(view1);
    // this.viewer = new this.PDFTron.NativeViewer({
    //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf'
    // });
    // var viewerElement = document.getElementById('viewer');
    //   PDFTron.NativeViewer({
    //     l: 'Islamic College Of Melbourne(icom.vic.edu.au):ENTERP:ICOM Parent App::IA:AMS(20200820):0867C5A01FC7A4D0E333FD7820612FCD7EDBA5C89DE51DFA54E510F67AD4BEF5C7',
    //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf',
    //   disabledElements: [
    //     // hide elements as you wish
    //     ]
    //   }, this.viewer);


    

    //this.viewer.showDocumentViewer();

    // WebViewer({
    //   path: '../lib',
    //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf'
    //   }, this.viewer.nativeElement).then(instance => {
    //   this.wvInstance = instance;

    //   // now you can access APIs through this.webviewer.getInstance()
    //   instance.openElement('notesPanel');
    //   // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

    //   // or listen to events from the viewer element
    //   this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
    //     const [ pageNumber ] = e.detail;
    //     console.log(`Current page is ${pageNumber}`);
    //   });

    //   // or from the docViewer instance
    //   instance.docViewer.on('annotationsLoaded', () => {
    //     console.log('annotations loaded');
    //   });

    //     instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler)
    //   })
    

    //let buffer = imageBlog.arrayBuffer();
    //30-09-2019 Sarvana commneted to test pdftron
    this.dissMissLoading();
    let pdfBlob = new Blob([pdfBuffer], {type: 'application/pdf'});
    this.file.writeFile(this.file.dataDirectory, "Test.pdf", pdfBlob, {replace: true}).then(c => {



      this.document.viewDocument(this.file.dataDirectory+"Test.pdf", "application/pdf",
        {print: {enabled: true}, bookmarks: {enabled: true}, email: {enabled: true}, title: "Test"});

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

        // this.viewer1=new  PDFTron.NativeViewer({
        //   l: 'Islamic College Of Melbourne(icom.vic.edu.au):ENTERP:ICOM Parent App::IA:AMS(20200820):0867C5A01FC7A4D0E333FD7820612FCD7EDBA5C89DE51DFA54E510F67AD4BEF5C7',
        //   initialDoc: this.file.dataDirectory+"Test.pdf",
        //   disabledElements: [
        //     'thumbnailsButton',
        //     'listsButton',
        //     'toolsButton',
        //     'moreItemsButton'
        //     ]
        //   }, this.viewer);


      // var viewerElement = document.getElementById('viewer');
      // var viewer = new this.PDFTron.NativeViewer({
      //   l: '0867C5A01FC7A4D0E333FD7820612FCD7EDBA5C89DE51DFA54E510F67AD4BEF5C7',
      //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf',
      //   disabledElements: [
      //     // hide elements as you wish
      //   ]
      // }, viewerElement);
      // var viewer = new this.PDFTron.NativeViewer({
      //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf'
      // });
      // viewer.showDocumentViewer();

      
    });

    //30-09-2019 Sarvana ends
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }

}

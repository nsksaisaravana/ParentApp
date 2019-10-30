import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
//import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ImageUploadService} from '../services/imageUpload.service';
import {ReenrolmentService} from '../services/reenrolment.service';
import * as FileSaver from 'file-saver'; 
import {IReEnrolment} from '../model/enrolment.interface';
import * as moment from 'moment'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
//import { Input } from '@ionic/angular';

@Component({
  selector: 'app-reenrolment',
  templateUrl: './reenrolment.page.html',
  styleUrls: ['./reenrolment.page.scss'],
})
export class ReenrolmentPage implements OnInit {

  @ViewChild(SignaturePad,{static:false}) signaturePad:SignaturePad;
  //@ViewChild('fullNameControl') fullNameElement:Input;
  @ViewChild('fullNameControl', { read: ElementRef,static:false}) fullNameControl: ElementRef;
  public signaturePadOptions:any;
  reenrolmentDetails={} as any;
  isSignaturePadNotSigned:boolean=false;
  currentChildren:number=1;
  isSecondChild:boolean=false;
  isThirdChild:boolean=false;
  isFourthChild:boolean=false;
  isFifthChild:boolean=false;
  reEnrolmentArray:any=[];
  constructor(private imageService:ImageUploadService,private reEnrolmentService:ReenrolmentService,
    private router:Router,public loadingController: LoadingController,private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit() {
    this.initializeSignaturePadOptions();
    this.clearInputValues();
    this.reenrolmentDetails.EnrolmentDate=new Date().toISOString();  //moment().toDate();
    console.log(this.reenrolmentDetails);
  }

  ngAfterViewInit(): void { 
    this.fullNameControl.nativeElement.focus();
    
  }

  clearInputValues(){
    this.reenrolmentDetails.FullName1='';
    this.reenrolmentDetails.FullName2='';
    this.reenrolmentDetails.FullName3='';
    this.reenrolmentDetails.FullName4='';
    this.reenrolmentDetails.FullName5='';

    this.reenrolmentDetails.Class1='';
    this.reenrolmentDetails.Class2='';
    this.reenrolmentDetails.Class3='';
    this.reenrolmentDetails.Class4='';
    this.reenrolmentDetails.Class5='';
    //this.clearSignature();
    //this.reenrolmentDetails={} ;
  }

  initializeSignaturePadOptions(){
    this.signaturePadOptions={
      minWidth:2,
      penColor:'rgb(66,133,244)',
      backgroudColor:'rgb(255,255,255)',
      canvasWidth:450,
      canvasHeight:150
    };
  }

  clearSignature(){
    if(this.signaturePad){
      if(typeof this.signaturePad.clear !==undefined && typeof this.signaturePad.clear ==='function'){
        this.signaturePad? this.signaturePad.clear():'';
      }
    }
    
  }

  async saveSignature(){
    try{
      this.isSignaturePadNotSigned=false;
      if(this.signaturePad.isEmpty()){
        this.isSignaturePadNotSigned=true;
        return;
      }
      //return;
      const base64=this.signaturePad.toDataURL();
      const blob=this.base64ToBlob(base64);
      const formData: FormData = new FormData();
      formData.append('Image', blob, "Test.png");
      formData.append('ImageCaption', "Test");
      await this.presentLoading();
      let uploadedImageDetails= await this.imageService.uploadImage(formData).toPromise();
      console.log(uploadedImageDetails);
      await this.reEnrolmentService.saveEnrolmentDetails(this.createEnrolmentChildrenDetails(uploadedImageDetails)).toPromise();
      this.clearInputValues();
      this.dissMissLoading();
      this.router.navigate(['/inside/menus/forms']);
    }
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
  }

  exitEnrolmentForm(){
    this.router.navigate(['/inside/menus/forms']);
  }

  base64ToBlob(base64){

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }


    const byteString=base64.split(',')[1];
    const mimeString=base64.split(',')[0].split(':')[1].split(':')[0];

    const blob = b64toBlob(byteString, mimeString);
    return blob;
  }

  createEnrolmentChildrenDetails(uploadedImageDetail){
    this.reEnrolmentArray=[];
    let enrolmentItem={} as any;
    enrolmentItem.FullName=this.reenrolmentDetails.FullName1;
    enrolmentItem.ClassName=this.reenrolmentDetails.Class1;
    enrolmentItem.DocumentPath=uploadedImageDetail.DocumentPath;
    //this.reEnrolmentArray.push(enrolmentItem);
    let jsonString=JSON.stringify(enrolmentItem);
    if(this.isSecondChild){
      enrolmentItem.FullName=this.reenrolmentDetails.FullName2;
      enrolmentItem.ClassName=this.reenrolmentDetails.Class2;
      enrolmentItem.DocumentPath=uploadedImageDetail.DocumentPath;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isThirdChild){
      enrolmentItem.FullName=this.reenrolmentDetails.FullName3;
      enrolmentItem.ClassName=this.reenrolmentDetails.Class3;
      enrolmentItem.DocumentPath=uploadedImageDetail.DocumentPath;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isFourthChild){
      enrolmentItem.FullName=this.reenrolmentDetails.FullName4;
      enrolmentItem.ClassName=this.reenrolmentDetails.Class4;
      enrolmentItem.DocumentPath=uploadedImageDetail.DocumentPath;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isFifthChild){
      enrolmentItem.FullName=this.reenrolmentDetails.FullName5;
      enrolmentItem.ClassName=this.reenrolmentDetails.Class5;
      enrolmentItem.DocumentPath=uploadedImageDetail.DocumentPath;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    jsonString="[" + jsonString + "]"
    return JSON.parse(jsonString);
  }

  addMoreChildrens(){
    this.currentChildren <5 ? this.currentChildren+=1:'';
    switch(this.currentChildren){
      case 2:{
        this.isSecondChild=true;
        return;
      }
      case 3:{
        this.isThirdChild=true;
        return;
      }
      case 4:{
        this.isFourthChild=true;
        return;
      }
      case 5:{
        this.isFifthChild=true;
        return
      }
      default:{
        return;
      }
      
    }
  }

  removeChildrens(){
    switch(this.currentChildren){
      case 5:{
        this.isFifthChild=false;
        this.currentChildren-=1;
        return;
      }
      case 4:{
        this.isFourthChild=false;
        this.currentChildren-=1;
        return;
      }
      case 3:{
        this.isThirdChild=false;
        this.currentChildren-=1;
        return;
      }
      case 2:{
        this.isSecondChild=false;
        this.currentChildren-=1;
        return
      }
      default:{
        return;
      }
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving re-enrolment',
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AbsenceService } from './services/absence.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturepadComponent } from '../shared/signaturepad/signaturepad.component';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {

  @ViewChild(SignaturePad,{static:false}) signaturePad:SignaturePad;
  //@ViewChild('fullNameControl') fullNameElement:Input;
  @ViewChild('fullNameControl', { read: ElementRef, static:false}) fullNameControl: ElementRef;
  @ViewChild(SignaturepadComponent,{static:false} ) signturePadComponent: SignaturepadComponent;
  public signaturePadOptions:any;
  absenceDetails={} as any;
  isSignaturePadNotSigned:boolean=false;
  currentChildren:number=1;
  isSecondChild:boolean=false;
  isThirdChild:boolean=false;
  isFourthChild:boolean=false;
  isFifthChild:boolean=false;
  reEnrolmentArray:any=[];
  base64String:any;
  constructor(private router:Router,public loadingController: LoadingController,public absenceService:AbsenceService,
    private userAuthenticationService:UserAuthenticationService,private alertController:AlertController) { }

  ngOnInit() {
    this.clearInputValues();
    this.absenceDetails.absenceFromDate=new Date().toISOString();  //moment().toDate();
    this.absenceDetails.absenceToDate=new Date().toISOString();
    console.log(this.absenceDetails);
  }


  clearInputValues(){
    this.absenceDetails.FullName1='';
    this.absenceDetails.FullName2='';
    this.absenceDetails.FullName3='';
    this.absenceDetails.FullName4='';
    this.absenceDetails.FullName5='';

    this.absenceDetails.Class1='';
    this.absenceDetails.Class2='';
    this.absenceDetails.Class3='';
    this.absenceDetails.Class4='';
    this.absenceDetails.Class5='';

    this.absenceDetails.Reason1='';
    this.absenceDetails.Reason2='';
    this.absenceDetails.Reason3='';
    this.absenceDetails.Reason4='';
    this.absenceDetails.Reason5='';
    //this.clearSignature();
    //this.absenceDetails={} ;
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



  async saveAbsenceDetails(){
    
    try{
      const formData: FormData = new FormData();
      await this.presentLoading();
      this.base64String=this.signturePadComponent.returnSignatureImageInBlobFormat(true);
      this.base64String=this.base64String.__zone_symbol__value;
      await this.absenceService.saveAbsenceDetails(this.createEnrolmentChildrenDetails(this.base64String)).toPromise();
      this.clearInputValues();
      this.dissMissLoading();
      await this.persentAlert("Success","Absence Details Saved Successfully","");
      this.router.navigate(['/inside/menus/home']);
    }
    catch{
      await this.dissMissLoading();
      alert("Token expired. Please login");
      this.userAuthenticationService.blankLoginDetails();
      this.router.navigate(['']);
    }
    
  }

  clearSignature(){
    this.signturePadComponent.clearSignature();
  }

  exitAbsenceForm(){
    this.router.navigate(['/inside/menus/home']);
  }



  createEnrolmentChildrenDetails(base64String){
    this.reEnrolmentArray=[];
    let enrolmentItem={} as any;
    let userName=this.userAuthenticationService.userDetails;
    enrolmentItem.FullName=this.absenceDetails.FullName1;
    enrolmentItem.ParentFullName=this.absenceDetails.ParentsFullName;
    enrolmentItem.ClassName=this.absenceDetails.Class1;
    enrolmentItem.Reason=this.absenceDetails.Reason1;
    enrolmentItem.AbsenceFromDate=this.absenceDetails.absenceFromDate;
    enrolmentItem.AbsenceToDate=this.absenceDetails.absenceToDate;
    enrolmentItem.UserName=userName.Title;
    enrolmentItem.AbsendOrLate=''; //this.absenceDetails.AbsendOrLate;
    enrolmentItem.AwayForFullDay=this.absenceDetails.YesOrNo;
    enrolmentItem.Base64String=base64String;
    //this.reEnrolmentArray.push(enrolmentItem);
    let jsonString=JSON.stringify(enrolmentItem);
    if(this.isSecondChild){
      enrolmentItem.FullName=this.absenceDetails.FullName2;
      enrolmentItem.ParentFullName=this.absenceDetails.ParentsFullName;
      enrolmentItem.ClassName=this.absenceDetails.Class2;
      enrolmentItem.Reason=this.absenceDetails.Reason2;
      enrolmentItem.AbsenceFromDate=this.absenceDetails.absenceFromDate;
      enrolmentItem.AbsenceToDate=this.absenceDetails.absenceToDate;
      enrolmentItem.UserName=userName.Title;
      enrolmentItem.AbsendOrLate=''; //this.absenceDetails.AbsendOrLate;
      enrolmentItem.AwayForFullDay=this.absenceDetails.YesOrNo;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isThirdChild){
      enrolmentItem.FullName=this.absenceDetails.FullName3;
      enrolmentItem.ParentFullName=this.absenceDetails.ParentsFullName;
      enrolmentItem.ClassName=this.absenceDetails.Class3;
      enrolmentItem.Reason=this.absenceDetails.Reason3;
      enrolmentItem.AbsenceFromDate=this.absenceDetails.absenceFromDate;
      enrolmentItem.AbsenceToDate=this.absenceDetails.absenceToDate;
      enrolmentItem.UserName=userName.Title;
      enrolmentItem.AbsendOrLate=''; //this.absenceDetails.AbsendOrLate;
      enrolmentItem.AwayForFullDay=this.absenceDetails.YesOrNo;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isFourthChild){
      enrolmentItem.FullName=this.absenceDetails.FullName4;
      enrolmentItem.ParentFullName=this.absenceDetails.ParentsFullName;
      enrolmentItem.ClassName=this.absenceDetails.Class4;
      enrolmentItem.Reason=this.absenceDetails.Reason4;
      enrolmentItem.AbsenceFromDate=this.absenceDetails.absenceFromDate;
      enrolmentItem.AbsenceToDate=this.absenceDetails.absenceToDate;
      enrolmentItem.UserName=userName.Title;
      enrolmentItem.AbsendOrLate=''; //this.absenceDetails.AbsendOrLate;
      enrolmentItem.AwayForFullDay=this.absenceDetails.YesOrNo;
      this.reEnrolmentArray.push(enrolmentItem);
      jsonString+= "," + JSON.stringify(enrolmentItem);
    }
    if(this.isFifthChild){
      enrolmentItem.FullName=this.absenceDetails.FullName5;
      enrolmentItem.ParentFullName=this.absenceDetails.ParentsFullName;
      enrolmentItem.ClassName=this.absenceDetails.Class5;
      enrolmentItem.Reason=this.absenceDetails.Reason5;
      enrolmentItem.AbsenceFromDate=this.absenceDetails.absenceFromDate;
      enrolmentItem.AbsenceToDate=this.absenceDetails.absenceToDate;
      enrolmentItem.UserName=userName.Title;
      enrolmentItem.AbsendOrLate=''; //this.absenceDetails.AbsendOrLate;
      enrolmentItem.AwayForFullDay=this.absenceDetails.YesOrNo;
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
      message: 'Saving Absence Details',
    });
    await loading.present();
  }

  async dissMissLoading(){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async persentAlert(typeofMessage,header,detail){
    const alert=await this.alertController.create({
      header:typeofMessage,
      subHeader:header,
      message:detail,
      buttons:['OK']
    });

    await alert.present();
  }

}

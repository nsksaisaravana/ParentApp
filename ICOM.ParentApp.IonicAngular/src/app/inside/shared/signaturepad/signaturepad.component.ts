import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signaturepad',
  templateUrl: './signaturepad.component.html',
  styleUrls: ['./signaturepad.component.scss']
})
export class SignaturepadComponent implements OnInit {

  @ViewChild(SignaturePad,{static:false}) signaturePad:SignaturePad;
  public signaturePadOptions:any;
  isSignaturePadNotSigned:boolean=false;
  constructor() { }

  ngOnInit() {
    this.initializeSignaturePadOptions();
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

  async returnSignatureImageInBlobFormat(isBase64){
    try{
      this.isSignaturePadNotSigned=false;
      if(this.signaturePad.isEmpty()){
        this.isSignaturePadNotSigned=true;
        return;
      }
      //return;
      const base64=this.signaturePad.toDataURL();
      if(isBase64){
        var imageString= base64.toString();
        imageString=imageString.split(',')[1];
        return imageString;
      }
      const blob=this.base64ToBlob(base64);
      const formData: FormData = new FormData();
      formData.append('Image', blob, "Test.png");
      formData.append('ImageCaption', "Test");
      return formData;
      //await this.presentLoading();
      //let uploadedImageDetails= await this.imageService.uploadImage(formData).toPromise();
      //console.log(uploadedImageDetails);
      //await this.reEnrolmentService.saveEnrolmentDetails(this.createEnrolmentChildrenDetails(uploadedImageDetails)).toPromise();
      //this.clearInputValues();
      //this.dissMissLoading();
      //this.router.navigate(['/inside/menus/forms']);
    }
    catch{
      //await this.dissMissLoading();
      alert("Token expired. Please login");
      //this.userAuthenticationService.blankLoginDetails();
      //this.router.navigate(['']);
    }
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

}

import { Component, OnInit,ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
//import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ImageUploadService} from '../../services/imageUpload.service';
import * as FileSaver from 'file-saver'; 

@Component({
  selector: 'app-enrolment-form',
  templateUrl: './enrolment-form.component.html',
  styleUrls: ['./enrolment-form.component.scss']
})
export class EnrolmentFormComponent implements OnInit {

  @ViewChild(SignaturePad,{static:false}) signaturePad:SignaturePad;

  public signaturePadOptions:any;

  constructor(private imageService:ImageUploadService) { }

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
    this.signaturePad.clear();
  }

  saveSignature(){
    //const base64=this.signaturePad.toDataURL('image/png',0.5);
    //var win=window.open();
    //win.document.write("<img src='"+this.signaturePad.toDataURL()+"'/>");
    //window.open(this.signaturePad.toDataURL("image/png", 100));
    const base64=this.signaturePad.toDataURL();
    //console.log(base64);
    const blob=this.base64ToBlob(base64);
    console.log(blob);
    const formData: FormData = new FormData();
    formData.append('Image', blob, "Test.png");
    formData.append('ImageCaption', "Test");
    //FileSaver.saveAs(blob, "New File.png");
    this.imageService.uploadImage(formData).subscribe(data=>{
      console.log(data);
    })

    // var byteCharacters = atob(base64);
    // var byteNumbers = new Array(byteCharacters.length);
    // for (var i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // var byteArray = new Uint8Array(byteNumbers);
    // var contentType=base64.split(',')[0].split(':')[1].split(':')[0];
    // var blob = new Blob([byteArray], {type: contentType});
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
    //FileSaver.saveAs(blob, "New File.png");

    //const blobUrl = URL.createObjectURL(blob);
    //window.open(blobUrl);
    // const byteNumbers=new Array(byteString.length);
    // for(let i=0; i <byteString.length; i++){
    //   byteNumbers[i]=byteString.charAt(i);
    // }
    // const ia=new Uint8Array(byteNumbers);
    // return new Blob([ia],{type:mimeString});
  }

}

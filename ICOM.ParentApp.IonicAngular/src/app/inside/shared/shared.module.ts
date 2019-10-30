import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturepadComponent } from './signaturepad/signaturepad.component';
import { IonicModule } from '@ionic/angular';
import {SignaturePadModule} from 'angular2-signaturepad';
@NgModule({
  declarations: [SignaturepadComponent],
  imports: [
    CommonModule,
    IonicModule,
    SignaturePadModule
  ],
  exports: [
    SignaturepadComponent, 
  ]
})
export class SharedModule { }

import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController:ToastController) { }

  async presentToast(message:string){
      const toast=await this.toastController.create({
          message,
          duration:4000
      });
      toast.present();
  }

  async presentErrorToast(message:string){
      const toast=await  this.toastController.create({
          message,
          position:'top',
          duration:30000,
          cssClass:'toast-error'
      });
      toast.present();
  }
}
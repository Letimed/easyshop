import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detailRecette',
  templateUrl: 'detailRecette.html'
})

export class DetailRecette {

  myRecette: any[] = [];
  myValues: string[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.myRecette = navParams.get('selectedRecette');
    this.getDetails();
   }

   async getDetails()
   {
   await this.storage.get('R_' + this.myRecette).then((val) => {
   	this.myValues = val;
  });
   }

}

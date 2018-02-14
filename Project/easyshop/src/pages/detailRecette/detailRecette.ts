import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detailRecette',
  templateUrl: 'detailRecette.html'
})

export class DetailRecette {

  myRecette: any[] = [];
  uniqueOccurency: any[] = [];
  numberOccurency: any[] = [];
  finaltab: any[] = [];
  myRecetteQuantity: any[] = [];
  name: any;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.myRecette = navParams.get('selectedRecette');
    this.name = navParams.get('nameRecette');
    this.myRecetteQuantity = navParams.get('selectedRecetteQuantity');
    console.log("myrecettequantity : " + this.myRecetteQuantity);
    this.uniqueOccurence();
    this.numberOccurence();
    this.fusion();
    // this.checkquantity();
   }

   uniqueOccurence(){
     let i = 0;
     this.uniqueOccurency = [];
     while (i < this.myRecette.length)
     {
       let a = 0;
       let existe = false;
       while(a < this.uniqueOccurency.length)
       {
         if (this.myRecette[i] == this.uniqueOccurency[a])
          {
            existe = true;
          }
          a++;
       }
       if (existe == false)
         this.uniqueOccurency.push(this.myRecette[i])
       i++;
     }
     console.log("unique occurency :" + this.uniqueOccurency);
   }

   numberOccurence()
   {
     this.numberOccurency = [];
     let i = 0;
     while (i < this.uniqueOccurency.length)
     {
       let a = 0;
       let cpt = 0 ;
       while (a < this.myRecette.length)
       {
         if (this.uniqueOccurency[i] == this.myRecette[a])
           cpt++;
         a++;
       }
       if (cpt != 0)
         this.numberOccurency.push(cpt);
       i++;
     }
     console.log("number occurency : " + this.numberOccurency);
   }

   fusion()
   {
     this.finaltab = [];
     let i = 0;
     while (i < this.uniqueOccurency.length)
     {
       this.finaltab.push("ingredient : " + this.uniqueOccurency[i] + " quantité : " + this.numberOccurency[i]);
       i++;
     }
   }
}

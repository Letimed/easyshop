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
  let a = 0 ;
  console.log("TAILLE RECETTE TAB : " + this.myRecette.length);
  while (a < this.uniqueOccurency.length)
  {
    let cpt = 0;
    let i = 0;
    console.log("a :" + a);
    while (i < this.myRecette.length)
    {
      console.log("i : " + i);
      if (this.uniqueOccurency[a] == this.myRecette[i])
      {
        console.log('myrecette[i] : ' + this.myRecette[i]);
        console.log('uniqueoccurence[a] : ' + this.myRecette[a]);
        console.log("cpt : " + cpt);
      cpt = cpt + this.myRecetteQuantity[i];
      }
       i++;
    }
    a++;
    this.uniqueOccurency.push(cpt);
   }
   console.log("numberOccurency : " + this.numberOccurency);
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

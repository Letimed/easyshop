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
  myRecetteQuantity: number[] = [];
  myRecettePrice: number[] = [];
  uniqueOccurency: any[] = [];
  numberOccurency: number[] = [];
  priceOccurency: number[] = [];
  finaltab: any[] = [];
  name: any;
  price:any;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.myRecette = navParams.get('selectedRecette');
    this.name = navParams.get('nameRecette');
    this.myRecetteQuantity = navParams.get('selectedRecetteQuantity');
    this.myRecettePrice = navParams.get('selectedRecettePrice');
    this.uniqueOccurence();
    this.numberOccurence();
    this.fusion();
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
       {
         this.uniqueOccurency.push(this.myRecette[i]);
         this.priceOccurency.push(this.myRecettePrice[i]);
       }
       i++;
     }
   }

   numberOccurence()
   {
     let i = 0;

     while (i < this.uniqueOccurency.length)
     {
       let x = 0;
       while (x < this.myRecette.length)
       {
         if(this.uniqueOccurency[i] == this.myRecette[x])
           {
             if (this.numberOccurency[i] == undefined)
             {
               this.numberOccurency.push(this.myRecetteQuantity[x]);
             }
             else
             {
               this.numberOccurency[i] += this.myRecetteQuantity[x];
             }
           }
         x = x + 1;
       }
       i = i + 1;
     }
   }

   fusion()
   {
     this.finaltab = [];
     let i = 0;
     this.price =  0;
     while (i < this.uniqueOccurency.length)
     {
       this.finaltab.push(this.uniqueOccurency[i] + ", Quantité : " + this.numberOccurency[i]);
       this.price = this.price + this.numberOccurency[i] * this.priceOccurency[i];
       console.log(this.price);
       i++;
     }
   }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ProduitPage } from '../produits/produits';
declare var require: any

@IonicPage()
@Component({
  selector: 'page-online-product',
  templateUrl: 'online-product.html',
})
export class OnlineProductPage {
	mySearch: any;
	product: any[] = [];
	productid: any[] = [];

  constructor(private db: DatabaseProvider,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  onSearch()
  {
 	this.product = [];
 	var a = this;
  	var unirest = require('unirest');

  	unirest.get("https://datagram-products-v1.p.mashape.com/storeproduct/search/?q=" + this.mySearch)
	.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
	.header("Accept", "application/json")
	.end(function (result) {
		let i = 0;
		while (i < result.body.length)
		{
			a.product.push(result.body[i].name);
	  		a.productid.push(result.body[i].superproduct_id);
	  		i = i + 1;
		}
	});

	this.doCustomToast('LOADING');
	setTimeout(() => {
	this.product.push('End');
    }, 3000);
  }

  doCustomToast(message: any)
  {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: "middle"
      });
      toast.present();
  }

  async showConfirm(item: any, i: any)
  {
  	var price = -1;
  	var a = this;

  	console.log('begin');
  	var unirest = require('unirest');
  	unirest.get("https://datagram-products-v1.p.mashape.com/storeproduct/superproduct_id/"+ this.productid[i] +"/")
	.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
	.header("Accept", "application/json")
	.end(function (result) {
		let i = 0;
		while (i < result.body.length)
		{
			if (result.body[i].price != null)
			{
				price = result.body[i].price;
				a.confirmAlert(item, price);
				return ;
			}
		  i = i + 1;
		}
		a.doToast('Erreur prix produit');
	});
  }

  confirmAlert(item: any, price: any)
  {
  	  let confirm = this.alertCtrl.create({
      title: 'Ajouter le produit ?',
      message: 'Prix en magasin : '+ price +'',
      buttons: [
        {
          text: 'Non',
          handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
	        this.db.execSQL('INSERT INTO product (name, price) VALUES (\''+ item +'\',\'' + price + '\')','Insert Product');
	        this.navCtrl.push(ProduitPage);
			let toast = this.toastCtrl.create({
      		message: 'Produit ajouté',
      		duration: 3000
      		});
		   toast.present();
          }
        }
      ]
    });
    confirm.present();
  }

doToast(message: string)
  {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlineProductPage');
  }

}

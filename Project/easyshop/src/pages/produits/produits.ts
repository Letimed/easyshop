import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-produit',
  templateUrl: 'produits.html',
})

export class ProduitPage {
  productName: any;
  productUnite: any;
  productPrice: any;
  product: any[] = [];
  constructor(public navCtrl: NavController, private storage: Storage, public toastCtrl: ToastController,public alertCtrl: AlertController) {
  	this.fillProduct();
  }



  async addProduct()
{

  	if (this.productUnite == null)
  		this.productUnite = "Aucune";
  	if (this.productPrice == null)
  		this.productPrice = 0;
  	if (this.productName != null)
  	{
  		if (await this.checkName() == true)
  			return ;
  		this.product[this.product.length] = "Produit : \'" + this.productName + "\' Unité : " + this.productUnite + " Prix : " + this.productPrice  + "€";
  		this.storage.set("P_" + this.productName, this.productUnite + "~" + this.productPrice);
  		let toast = this.toastCtrl.create({
      	message: 'Le produit a bien été ajouté',
      	duration: 3000
    	});
    	toast.present();
	}
	else {
		let toast = this.toastCtrl.create({
      	message: 'Nom de produit incorrect',
      	duration: 3000
      });
		   toast.present();
  	}
}

	fillProduct()
	{
		this.product = [];
		let i = 0;
  		this.storage.forEach((index, key, value) => {
  		if (key != null && key[0] == "P")
  		{
  			let parsedKey = key.split("_");
  			let parsedValue = index.split("~");
  			this.product[i] = "Produit : \'" + parsedKey[1] + "\' Unité : " + parsedValue[0] + " Prix : " + parsedValue[1] + "€";
  			i++;
  		}
		});
	}

	async checkName()
	{
		if (await this.storage.get("P_" + this.productName) == undefined) { return false; }
		else
		{
		let toast = this.toastCtrl.create({
      	message: 'Le produit existe déjà',
      	duration: 3000
    	});
    	toast.present();
		return true;
		}
	}

	async showConfirm(item: any) {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer ?',
      message: 'Êtes-vous sûr de vouloir supprimer définitivement se produit ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
          	let stringToRm = item.split("\'");
            this.storage.remove("P_" + stringToRm[1]);
            this.fillProduct();      
			let toast = this.toastCtrl.create({
      		message: 'Produit supprimé',
      		duration: 3000
      		});
		   toast.present();
          }
        }
      ]
    });
    confirm.present();
  }

}
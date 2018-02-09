import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';


@Component({
  selector: 'page-produit',
  templateUrl: 'produits.html',
})

export class ProduitPage {
  productName: any;
  productPrice: any;
  product: any[] = [];
  constructor(private db: DatabaseProvider,public navCtrl: NavController, private storage: Storage, public toastCtrl: ToastController,public alertCtrl: AlertController,private sqlite: SQLite) {

  	this.fillProduct();
  }

  async addProduct()
  {
  	if (this.productPrice == null)
  		this.productPrice = 0;
  	if (this.productName != null)
  	{
  		if (await this.checkName() == true)
  			return ;
  		this.product[this.product.length] = "Produit : \'" + this.productName + "\' Prix : " + this.productPrice  + "€";
      await this.db.execSQL('INSERT INTO product (name, price) VALUES (\''+this.productName+'\',\'' + this.productPrice + '\')','Insert Product');
      //this.fillProduct();
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

	async fillProduct()
	{
		this.product = [];
    await this.db.execSQL("SELECT * FROM product","Get all product");
    let i = 0
    while (i < this.db.cmd.rows.length)
    {
      this.product[i] = 'Produit : \'' + this.db.cmd.rows.item(i).name + '\' Prix : \'' + this.db.cmd.rows.item(i).price + '\' €';
      console.log(this.product[i]);
      i = i + 1;
    }
	}

	async checkName()
  {
    await this.db.execSQL('SELECT * from product where name=\''+this.productName+'\'','GET NAME DB')
    if (this.db.cmd.rows.length == 0)
      { return false; }
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
            this.db.execSQL('DELETE FROM product WHERE name =\''+ stringToRm[1]+'\'','Delete Product');
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

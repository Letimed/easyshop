import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { OnlineProductPage } from '../online-product/online-product';


@Component({
  selector: 'page-produit',
  templateUrl: 'produits.html',
})

export class ProduitPage {
  productName: any;
  productPrice: any;
  product: any[] = [];
  constructor(private db: DatabaseProvider,public navCtrl: NavController, public toastCtrl: ToastController,public alertCtrl: AlertController) {

  	this.fillProduct();
  }

  async addProduct()
  {
    if (this.productPrice == null)
      this.productPrice = 0;
    let price = parseFloat(this.productPrice);
    if (isNaN(price))
    {
      this.doToast('Prix incorrecte');
      return ;
    }
  	if (this.productName != null)
  	{
  		if (await this.checkName() == true)
  			return ;
  		this.product[this.product.length] = "Produit : \'" + this.productName + "\' Prix : " + price  + "€";
      await this.db.execSQL('INSERT INTO product (name, price) VALUES (\''+this.productName+'\',\'' + price + '\')','Insert Product');
      this.doToast('Le produit a bien été ajouté');
	  }
	  else 
      this.doToast('Nom de produit incorrect');
  }

  searchOnline()
  {
    this.navCtrl.push(OnlineProductPage);
  }

	async fillProduct()
	{
		this.product = [];
    await this.db.execSQL("SELECT * FROM product","Get all product");
    let i = 0;
    while (i < this.db.cmd.rows.length)
    {
      this.product[i] = 'Produit : \'' + this.db.cmd.rows.item(i).name + '\' Prix : \'' + this.db.cmd.rows.item(i).price + '\' €';
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
       this.doToast('Le produit existe déjà');
       return true;
     }
	}

	async showConfirm(item: any) {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer ?',
      message: 'Êtes-vous sûr de vouloir supprimer définitivement le produit ?',
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


doToast(message: string)
  {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
  }
}


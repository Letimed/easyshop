import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { mesRecettes } from '../mesRecettes/mesRecettes';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})

export class RecettePage {

  searchQuery: string = '';
  recetteName: any;
  items: string[] = [];
  recette: any[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.initializeItems();

  }

  initializeItems() {
    let i = 0;
    this.storage.forEach((index, key, value) => {
    if (key != null && key[0] == "P")
    		{
          let parsedKey = key.split("_");
     			let parsedValue = index.split("~");
    			this.items[i] = parsedKey[1];
    			i++;
    		}
  		});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async addRecette()
  {
  	if (this.recette == null){
  		let toast = this.toastCtrl.create({
            	message: 'recette inéxistante',
            	duration: 3000
        });
      toast.present();
   }
   else if (this.recetteName == null) {
  	let toast = this.toastCtrl.create({
                	message: 'Entrez un nom pour votre recette',
                	duration: 3000
            });
    toast.present();
    }
  	else {
  		await this.storage.set("R_" + this.recetteName, this.recette);
  		let toast = this.toastCtrl.create({
      	message: 'La recette a bien été ajouté',
      	duration: 3000
    	});
    	toast.present();
    	this.clearAll();
	  }
  }

  debug(){
    this.storage.get('R_chili').then((val) => {
    console.log('chili : ', val);});
  }

  clearAll(){
  this.recetteName = null;
  this.recette = null;
 }

  getListRecette(){
  let i = 0;
    this.storage.forEach((index, key, value) => {
    if (key != null && key[0] == "R")
    		{
          let parsedKey = key.split("_");
     			let parsedValue = index.split("~");
    			this.recette[i] = parsedKey[1];
    			i++;
    		}
  		});
  }

  itemSelected(item: string) {
    let prompt = this.alertCtrl.create({
      title: 'Ajout du Produit',
      message: "Quelle quantité souhaité vous ajouté ?",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantité'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            this.recette.push(item + ":" + data.quantity);
          }
        }
      ]
    });
    prompt.present();
  }

  goToMesRecettes() {
    	this.navCtrl.push(mesRecettes);
    }
}

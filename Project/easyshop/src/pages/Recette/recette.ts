import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})

export class RecettePage {

  searchQuery: string = '';
  recetteName: any;
  items: string[] = [];
  recette: any[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.initializeItems();

  }

  initializeItems() {
    let i = 0;
    this.storage.forEach((index, key, value) => {
    if (key != null && key[0] == "P")
    		{
          let parsedKey = key.split("_");
     			let parsedValue = index.split("~");
    		  console.log("boucle : " + i);
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
                  this.storage.get('R_chili').then((val) => {
    console.log('value', val);
  });
    	/////////////////////////// debug /////////////////////////
    	/**let i = 0
    	console.log(this.recetteName);
      for (i; i < 5; i++)
      {
        console.log(this.recette[i]);
       i = i + 1;
      }*/
      ///////////////////////////////////////////////////////////
	  }
  }

  itemSelected(item: string) {
      console.log("Selected Item", item);
      this.recette.push(item);
  }
}

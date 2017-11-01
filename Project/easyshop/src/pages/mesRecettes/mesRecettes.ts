import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailRecette } from '../detailRecette/detailRecette';

@Component({
  selector: 'page-mesRecettes',
  templateUrl: 'mesRecettes.html',
})

export class mesRecettes {

  items: any[] = [];
  recette: any[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.initializeItems();
  }

  initializeItems() {
      let i = 0;
      this.storage.forEach((index, key, value) => {
      if (key != null && key[0] == "R")
      		{
            let parsedKey = key.split("_");
       			//let parsedValue = index.split("~");
      			this.items[i] = parsedKey[1];
      			i++;
      		}
    		});
    }

    itemSelected(item: any) {
          this.recette.push(item);
          this.navCtrl.push(DetailRecette, {selectedRecette: this.recette});
      }
}

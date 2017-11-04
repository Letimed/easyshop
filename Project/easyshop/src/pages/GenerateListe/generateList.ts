import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { affichageRecette } from '../affichageRecette/affichageRecette';


@Component({
  selector: 'page-generateList',
  templateUrl: 'generateList.html',
})

export class generateList {
	  items: any[] = [];
	  recette: any[] = [];
	  myRecette: string[] = [];

	  constructor(public navCtrl: NavController, private storage: Storage) {
	  	this.fillName();
		}


	fillName()
	{
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

	showList()
	{
		this.navCtrl.push(affichageRecette, {selectedRecette: this.myRecette});
	}

	addRecette(recetteName: any)
	{
		this.myRecette.push(recetteName);
	}

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-affichageRecette',
  templateUrl: 'affichageRecette.html',
})

export class affichageRecette {
	  myRecette: any[] = [];
	  myProduit: any[] = [];

	  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {
	  	    this.myRecette = navParams.get('selectedRecette');
	  	    this.fillProduit();
		}

	fillProduit()
	{
		for (let i of this.myRecette)
		{
			this.storage.get("R_" + i).then((val) => {
			this.myProduit.push(val);
  			});
		}
	}

}
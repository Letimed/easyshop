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
	  myResult: any[] = [];

	  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {
	  	    this.myRecette = navParams.get('selectedRecette');
	  	    this.fillProduit();
		}

	async fillProduit()
	{
		for (let i of this.myRecette)
		{
			await this.storage.get("R_" + i).then((val) => {
			this.myProduit.push(val);
			let found = 0;
			for (let j of this.myResult)
			{
				for (let k of j)
				{
					if (k == val)
					{
						console.log("found");
						found = 1;
					}
				}
			}
  			});
		}
	}

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { affichageRecette } from '../affichageRecette/affichageRecette';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';
import { ListePage } from '../ListesDeCourses/liste';



@Component({
  selector: 'page-generateList',
  templateUrl: 'generateList.html',
})

export class generateList {
	  items: any[] = [];
	  recette: any[] = [];
	  myRecette: string[] = [];
	  listName: any;

	  constructor(private db: DatabaseProvider, public navCtrl: NavController,public toastCtrl: ToastController, private storage: Storage) {
	  	this.fillName();
		}


	async fillName()
	{
    	await this.db.execSQL("Select DISTINCT name FROM recipe", "SELECT ALL RECIPE");
    	let i = 0;
    	while (i < this.db.cmd.rows.length)
    	{
    		this.items[i] = this.db.cmd.rows.item(i).name;
    		i = i + 1;
    	}
	}

	async showList()
	{
		var idList = 0;
		let i = 0;

		if (await this.checkName() == true)
			return ;
		if (this.listName == "")
		{
			this.doToast("Nom de liste vide");
			return ;
		}
		await this.db.execSQL('Select id from list order by id desc','Get ID LIST');
		if (this.db.cmd.rows.length == 0)
			idList = 0;
		else
			idList = this.db.cmd.rows.item(0).id + 1;
		console.log(idList);
		while (i < this.items.length)
		{
			await this.db.execSQL('SELECT DISTINCT id from recipe where name=\''+ this.items[i] +'\' ','Get Recipes IDs');
			await this.db.execSQL('INSERT INTO LIST VALUES ('+ idList +',\''+ this.listName + '\', '+ this.db.cmd.rows.item(0).id +', -1)','INSERT LIST');
			i = i + 1;
		}
		this.doToast("Liste "+ this.listName +" ajouté")
		this.navCtrl.push(ListePage);
	}

	async checkName()
	{
    await this.db.execSQL('SELECT * from list where name=\''+this.listName+'\'','GET NAME DB')
    console.log(this.db.cmd.rows.item(0));
    if (this.db.cmd.rows.length == 0)
      { return false; }
     else
     {
     	this.doToast('Une liste du même nom existe');
    	return true; 
     }
	}

	doToast(message: string)
	{
		let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
	}

	addRecette(recetteName: any)
	{
		this.myRecette.push(recetteName);
	}

}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailListPage } from '../detail-list/detail-list';


/**
 * Generated class for the MenuListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuListPage {
	myList: any[] = [];
  recetteSelectedItem: any[] = [];
  recetteSelectedItemQuantity: any[] = [];
  recetteSelectedPrice: any[] = [];

  constructor(private db: DatabaseProvider,public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	this.fillList();
  }



	async fillList()
	{
		this.myList = [];
		await this.db.execSQL('Select DISTINCT name from list', 'Get List Name');
		let i = 0;
		while (i < this.db.cmd.rows.length)
		{
			this.myList[i] = 'Liste : \'' + this.db.cmd.rows.item(i).name + '\'';
			i = i + 1;
		}		
	}

	async showConfirm(item: any) {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer ?',
      message: 'Êtes-vous sûr de vouloir supprimer définitivement la liste ?',
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
            this.db.execSQL('DELETE FROM list WHERE name =\''+ stringToRm[1]+'\'','Delete List');
            this.fillList();
			let toast = this.toastCtrl.create({
      		message: 'Liste supprimé',
      		duration: 3000
      		});
		   toast.present();
          }
        }
      ]
    });
    confirm.present();
  }



  async goTo(item: any)
  {
    let name = item.split("\'");
    this.recetteSelectedItem = [];
    this.recetteSelectedPrice = [];
    this.recetteSelectedItemQuantity = [];
    await this.setParam(name[1]);
    console.log('CHECK HERE : '+ this.recetteSelectedItem);
    this.navCtrl.push(DetailListPage, {selectedRecette: this.recetteSelectedItem, 
      nameRecette:name[1], selectedRecetteQuantity: this.recetteSelectedItemQuantity, selectedRecettePrice:this.recetteSelectedPrice});
  }

  async setParam(item: any)
  {
    let idRecipe: any[] = [];
    await this.db.execSQL('Select * from list where name=\'' + item + '\'' ,'get recipe from list');
    let i = 0;
    while (i < this.db.cmd.rows.length)
    {
      idRecipe.push(this.db.cmd.rows.item(i).idRecette);
      i++;
    }
    console.log(idRecipe);
    let x = 0;
    while (x < idRecipe.length)
    {
      await this.db.execSQL('Select * from recipe where id='+ idRecipe[x] +'','Select Recipe From ID');
      let y = 0;
      console.log(this.db.cmd.rows.length);
      while (y < this.db.cmd.rows.length)
      {
        this.recetteSelectedItem.push(this.db.cmd.rows.item(y).idProduct);
        this.recetteSelectedItemQuantity.push(this.db.cmd.rows.item(y).quantity);
        y++;
      }
      x++;
    }
    let k = 0;
    while (k < this.recetteSelectedItem.length)
    {
      await this.db.execSQL('select name, price from product where id='+ this.recetteSelectedItem[k] +'','Get Price And Product Name');
      this.recetteSelectedItem[k] = this.db.cmd.rows.item(0).name;
      this.recetteSelectedPrice.push(this.db.cmd.rows.item(0).price);
      k++;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListPage');
  }

}

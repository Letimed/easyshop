import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListPage');
  }

}

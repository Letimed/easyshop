import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-detailRecette',
  templateUrl: 'detailRecette.html'
})

export class DetailRecette {

  myRecette: any[] = [];
  idlist: any[] = [];
  myValues: string[] = [];

  constructor(private db: DatabaseProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.myRecette = navParams.get('selectedRecette');
    this.getDetails();
   }

   async getDetails()
   {
     await this.db.execSQL('Select idProcuct FROM recipe WHERE name =\'' + this.myRecette + '\'', "get idproduct");
     let i = 0;
     while (i < this.db.cmd.rows.length)
     {
       this.idlist.push(this.db.cmd.rows.item(i));
       i = i + 1;
     }
     let a = 0;
     while (a < this.idlist.length)
     {
       await this.db.execSQL('Select name from product where id =\'' + this.idlist[a] + '\'', 'get name of list');
       console.log(this.db.cmd.rows.item(a).name);
       a = a + 1;
     }
   }

}

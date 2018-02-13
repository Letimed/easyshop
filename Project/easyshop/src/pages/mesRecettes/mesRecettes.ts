import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailRecette } from '../detailRecette/detailRecette';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-mesRecettes',
  templateUrl: 'mesRecettes.html',
})

export class mesRecettes {
  items: any[] = [];
  recette: any[] = [];
  recetteSelected: any[] = [];

  constructor(private db: DatabaseProvider, public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.fillRecette();
    this.aa();
  }


  async fillRecette()
  {
      this.recette = [];
      await this.db.execSQL("SELECT DISTINCT name FROM recipe","Get all recette");
      let i = 0;
      while (i < this.db.cmd.rows.length)
       {
          this.recette.push(this.db.cmd.rows.item(i).name);
          i = i + 1;
       }
  }

async aa()
{
  await this.db.execSQL("SELECT * FROM recipe where name = A" , "Get ing from name");
          let j = 0;
          while (j < this.db.cmd.rows.length)
          {
            console.log(this.db.cmd.rows.item(j).idproduct);
            j++;
          }
    }

    async itemSelected(item: any) {
          this.recetteSelected.push(item);
          await this.db.execSQL("SELECT idProduct FROM recipe WHERE name = " + item , "Get ing from name");
          let j = 0;
          let a = 1;
          console.log("resetteelected 0 :" + this.recetteSelected[0]);
          console.log("SIZE : " + this.db.cmd.rows.length);
          while (j < this.db.cmd.rows.length)
          {
            this.recetteSelected[a] = this.db.cmd.rows.item(j).idProduct;
            console.log(this.db.cmd.rows.item(j).idProduct);
            j++;
            a++;
          }
          console.log(this.recetteSelected);
          this.navCtrl.push(DetailRecette, {selectedRecette: this.recetteSelected});
      }

    async showConfirm(item: any) {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer ?',
      message: 'Êtes-vous sûr de vouloir supprimer définitivement cette recette ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.db.execSQL('DELETE FROM recette WHERE name =\''+ item+'\'','Delete Recette');
            this.fillRecette();
                        let toast = this.toastCtrl.create({
                message: 'Recette supprimé',
                duration: 3000
                });
                   toast.present();
          }
        }
      ]
    });
    confirm.present();
  }


}

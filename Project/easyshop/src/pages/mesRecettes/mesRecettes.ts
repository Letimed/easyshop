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
  recetteSelectedItem: any[] = [];
  recetteSelectedItemQuantity: any[] = [];
  recetteSelectedPrice: any[] = [];

  constructor(private db: DatabaseProvider, public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.fillRecette();
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

    async itemSelected(item: any) {
      this.recetteSelected = [];
      this.recetteSelectedItem = [];
      this.recetteSelectedItemQuantity = []; 
      this.recetteSelectedPrice = [];   

      await this.db.execSQL("SELECT idProduct , quantity FROM recipe WHERE name=\'" + item + '\'' , "Get ing from name");
      let j = 0;
      let a = 0;
      while (j < this.db.cmd.rows.length)
       {
        this.recetteSelected[a] = this.db.cmd.rows.item(j).idProduct;
        this.recetteSelectedItemQuantity[a] = this.db.cmd.rows.item(j).quantity;
        j++;
        a++;
       }
     let k = 0;
     while (k < this.recetteSelected.length)
       {
        let l = 0;
        await this.db.execSQL("SELECT name, price FROM product WHERE id =" + this.recetteSelected[k] , "Get ing from name");
        while (l < this.db.cmd.rows.length)
         {
            this.recetteSelectedItem.push(this.db.cmd.rows.item(l).name);
            this.recetteSelectedPrice.push(this.db.cmd.rows.item(l).price);
            l++;
          }
         k++;
        }
        console.log(this.recetteSelectedItem);
        console.log(this.recetteSelectedItemQuantity);
        this.navCtrl.push(DetailRecette, {selectedRecette: this.recetteSelectedItem, 
         nameRecette:item, selectedRecetteQuantity: this.recetteSelectedItemQuantity, selectedRecettePrice:this.recetteSelectedPrice});
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
            this.db.execSQL('DELETE FROM recipe WHERE name =\''+ item +'\'','Delete Recette');
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

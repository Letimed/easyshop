import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailRecette } from '../detailRecette/detailRecette';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-mesRecettes',
  templateUrl: 'mesRecettes.html',
})

export class mesRecettes {
  items: any[] = [];
  recette: any[] = [];

  constructor(private db: DatabaseProvider, public navCtrl: NavController, private storage: Storage) {
    this.initializeItems();
  }

  async initializeItems() {
    await this.db.execSQL("SELECT DISTINCT name FROM recipe ", "Get all product");
    let i = 0;
    while(i < this.db.cmd.rows.length)
    {
      this.items[i] = this.db.cmd.rows.item(i).name;
      i=i+1;
    }
    }

    itemSelected(item: any) {
          this.recette.push(item);
          this.navCtrl.push(DetailRecette, {selectedRecette: this.recette});
          this.recette = [];
      }
}

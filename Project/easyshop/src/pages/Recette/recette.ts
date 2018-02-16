import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { mesRecettes } from '../mesRecettes/mesRecettes';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})

export class RecettePage {

  searchQuery: string = '';
  recetteName: any;
  items: string[] = [];
  recette: any[] = [];
  quantity: any[] = [];

  constructor(private db: DatabaseProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.initializeItems();

  }
// get product from our bdd
  async initializeItems() {
    await this.db.execSQL("SELECT * FROM product", "Get all product");
    let i = 0;
    while(i < this.db.cmd.rows.length)
    {
      this.items[i] = this.db.cmd.rows.item(i).name;
      i=i+1;
    }
// this.init2();       
  }

// get ingredients from api 
  /*async init2()
  {
    declare var require: any
    var unirest = require('unirest');
    unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
        .header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
        .header("Accept", "application/json")
        .end(function(result) 
        {
            for (i of result.body)
            {

            }
        })
  }*/


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async addRecette()
  {
     if (this.recetteName === "" && this.recette === null) {
        this.createtoast('Entrez un nom pour votre recette et completez la');
      return;
    }
    else if( await this.recetteExist()) {
       this.createtoast('Nom de recette déjà utilisé');
       return;
    }
    else {
          // Create new id
          await this.db.execSQL("SELECT id FROM recipe order by id desc","Get max id");
          let newidmax;
          if (this.db.cmd.rows.length == 0)
            newidmax = 0;
          else
            newidmax = this.db.cmd.rows.item(0).id + 1;
          // Insert into bdd
          if (this.recette == null || this.recette.length == 0){
            this.createtoast('cette recette ne contient pas de produits');
          }
          let i = 0;
          while ( i < this.recette.length)
          {
            await this.db.execSQL('SELECT id FROM product WHERE name =\''+ this.recette[i] +'\'', "get id from product");
            let a = 0;
            let ingid;
            while (a < this.db.cmd.rows.length)
            {
              ingid = this.db.cmd.rows.item(a).id;
              a = a + 1;
              this.debug(ingid, "ingid");
            }
            // insert into bdd 
            await this.db.execSQL('INSERT INTO recipe (id, name, idProduct, quantity) VALUES (\''+ newidmax +'\',\'' + this.recetteName + '\',\'' + ingid + '\',\'' + this.quantity[i] +'\')','Insert Recette');
            newidmax = newidmax + 1;
            i = i + 1;
          }
        this.createtoast('La recette a bien été ajouté');
        this.clearAll();
        }
  }

  itemSelected(item: string) {
    let prompt = this.alertCtrl.create({
      title: 'Ajout du Produit',
      message: "Quelle quantité souhaité vous ajouté ?",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            let checkvar = parseInt(data.quantity);
            if (!isNaN(checkvar)) {
              this.recette.push(item);
              this.quantity.push(data.quantity);
            }
            else {
              this.createtoast('Quantitée érronée');
            }
          }
        }
      ]
    });
    prompt.present();
  }

  debug (i, nom){
        console.log("--------------------------------------------------------");
        console.log(nom);
        console.log(i);
        console.log("--------------------------------------------------------");
  }

  clearAll(){
  this.recetteName = "";
  this.recette = [];
 }

 resetpage(){
    this.navCtrl.pop();
    this.navCtrl.push(RecettePage);
 }

 createtoast(message)
 {
   let toast = this.toastCtrl.create({
              message: message,
              duration: 3000
          });
          toast.present();
 }

  async recetteExist()
  {
    await this.db.execSQL('SELECT * from recipe where name=\''+this.recetteName+'\'','Compare recette name')
    if (this.db.cmd.rows.length == 0)
       return false;
    else
       return true;
  }

  goToMesRecettes() {
        this.navCtrl.push(mesRecettes);
    }
}

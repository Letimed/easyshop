import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { generateList } from '../GenerateListe/generateList';
import { MenuListPage } from '../menu-list/menu-list'; 


@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
})

export class ListePage {

  constructor(public navCtrl: NavController) {}

    genererButton() {
     this.navCtrl.push(generateList);
  }

    myListeButton() {
    this.navCtrl.push(MenuListPage);
  	console.log("click myListeButton");
  }

    gererButton() {
  	console.log("click gererButton");
  }
}
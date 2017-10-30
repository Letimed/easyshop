import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
})

export class ListePage {

  constructor(public navCtrl: NavController) {}

    genererButton() {
  	console.log("click genererButton");
  }

    myListeButton() {
  	console.log("click myListeButton");
  }

    gererButton() {
  	console.log("click gererButton");
  }
}
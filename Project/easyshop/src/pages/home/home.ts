import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
<<<<<<< HEAD
import firebase from 'firebase';
=======
import { NavigationPage } from '../Navigation/navigation';
import { ListePage } from '../ListesDeCourses/liste';
import { OptionPage } from '../options/options';
import { ProduitPage } from '../produits/produits';
import { RecettePage } from '../recettes/recettes';
>>>>>>> abb192e1bf236cddd10d6a7d989b429aa18f844c

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  userProfile: any = null;

<<<<<<< HEAD
  constructor(public navCtrl: NavController) {
=======
  constructor(public navCtrl: NavController) {}

  geoLocButton() { 
  	this.navCtrl.push(NavigationPage); 
  }

  listeButton() { 
  	this.navCtrl.push(ListePage); 
>>>>>>> abb192e1bf236cddd10d6a7d989b429aa18f844c
  }

  produitButton() {
    this.navCtrl.push(ProduitPage);
  }

  recetteButton() {
    this.navCtrl.push(RecettePage);
  }

  optionButton() {
    this.navCtrl.push(OptionPage);
  }

  settingButton() {
  	console.log("click settingButton");
  }

  facebookButton() {
  	console.log("click facebookButton");
  }
 
}


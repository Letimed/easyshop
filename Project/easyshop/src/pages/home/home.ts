import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavigationPage } from '../Navigation/navigation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  geoLocButton() {
  	console.log("clic");
  	this.navCtrl.push(NavigationPage);
  }
 
}

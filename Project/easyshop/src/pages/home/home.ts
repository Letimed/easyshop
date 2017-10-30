import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  userProfile: any = null;

  constructor(public navCtrl: NavController) {
  }

}


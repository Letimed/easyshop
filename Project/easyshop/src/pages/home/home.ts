import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
      /**unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
      .header("X-Mashape-Key", "ThOXlrzNNOmshsnKuXV73dC9bFEyp1qa5EJjsnZ96p0ss8gGO3")
      .header("Accept", "application/json")
      .end(function (result) {
      console.log(result.status, result.headers, result.body);
      });*/
  }

}

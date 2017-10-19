import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';

@Component({
  selector: 'page-home',
  templateUrl: 'CallApi.html',
  providers: [PeopleServiceProvider]
})

export class CallApi {

 public people: any;
  constructor(public navCtrl: NavController,public peopleService: PeopleServiceProvider) {
    this.loadPeople();
     let unirest = require('unirest');
     let request = unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
    .header("X-Mashape-Key", "ThOXlrzNNOmshsnKuXV73dC9bFEyp1qa5EJjsnZ96p0ss8gGO3")
    .header("Accept", "application/json")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });
    }

  loadPeople(){
    this.peopleService.load()
    .then(data => {
      this.people = data;
    });
  }


}

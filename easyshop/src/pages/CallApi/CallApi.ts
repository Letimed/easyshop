import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
declare var require: any


@Component({
  selector: 'page-home',
  templateUrl: 'CallApi.html',
  providers: [PeopleServiceProvider]
})

export class CallApi {

 public people: any;
  constructor(public navCtrl: NavController,public peopleService: PeopleServiceProvider) {
    //this.loadPeople();
    var unirest = require('unirest');
    // These code snippets use an open-source library. http://unirest.io/nodejs
    unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
    .header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
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

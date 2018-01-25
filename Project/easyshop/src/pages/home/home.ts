import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavigationPage } from '../Navigation/navigation';
import { ListePage } from '../ListesDeCourses/liste';
import { OptionPage } from '../options/options';
import { ProduitPage } from '../produits/produits';
import { RecettePage } from '../Recette/recette';
import { mesRecettes } from '../mesRecettes/mesRecettes';
import { OneSignal } from '@ionic-native/onesignal';
import { LoginPage } from '../Login/login';
import { Http} from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  userProfile: any = null;


  constructor(public navCtrl: NavController, private oneSignal: OneSignal, private http: Http, private sqlite: SQLite) {
    //
    // ONESIGNAL INIT
    //
    this.oneSignal.startInit('f1c036d3-cd14-411b-846b-d5400c9edcc1', '378512581486');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
     console.log("A");
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
    // do something when a notification is opened
     console.log("B");
    });

    this.oneSignal.endInit();
    //
    //ONE SIGNAL END
    //

    //
    // INIT DATABASE
    //
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      db.executeSql('create table IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INT NOT NULL)', {})
        .then(() => console.log('LOADING PRODUCT : OK'))
        .catch(e => console.log(e));
      // SELECT MAX(id) FROM recipe
      db.executeSql('create table IF NOT EXISTS recipe(id INT NOT NULL, name TEXT NOT NULL, idProduct INT NOT NULL, quantity INT NOT NULL)', {})
        .then(() => console.log('LOADING RECIPE : OK'))
        .catch(e => console.log(e));
      db.executeSql('create table IF NOT EXISTS list(id INT NOT NULL, idRecette INT NOT NULL)', {})
        .then(() => console.log('LOADING LIST : OK'))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
    //
    // END DATABASE
    //

  }

  geoLocButton() {
  	this.navCtrl.push(NavigationPage);
  }

  listeButton() {
  	this.navCtrl.push(ListePage);
  }

  produitButton() {
    this.navCtrl.push(ProduitPage);
  }

  recetteButton() {
    this.navCtrl.push(RecettePage);
  }

  mesRecetteButton() {
    this.navCtrl.push(mesRecettes);
  }

  optionButton() {
    //this.navCtrl.push(OptionPage);
  }

  settingButton() {
  	console.log("click settingButton");
  }

  facebookButton() {
  	console.log("click facebookButton");
    this.navCtrl.push(LoginPage);
  }

  pushNotif() {
    console.log("PushNotifButton");
    this.oneSignal.getIds().then(ids => {
      var body = {
        app_id: 'f1c036d3-cd14-411b-846b-d5400c9edcc1',
        include_player_ids: [ids.userId],
        contents: {
          en: "Notif Message"
        },
        headings: {
          en: "Test Notification"
        }
      };
      this.http.post('https://onesignal.com/api/v1/notifications', body).subscribe(data => {
        console.log(data);
      } , error => {
        console.log(error);
      });
    });
    }
}


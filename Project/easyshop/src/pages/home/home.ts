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
import { DatabaseProvider } from '../../providers/database/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  userProfile: any = null;


  constructor(private db: DatabaseProvider,public navCtrl: NavController, private oneSignal: OneSignal, private http: Http, private sqlite: SQLite) {
    //
    // ONESIGNAL INIT
    //
    this.oneSignal.startInit('f1c036d3-cd14-411b-846b-d5400c9edcc1', '378512581486');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
    });

    this.oneSignal.endInit();
    //
    //ONE SIGNAL END
    //

    this.setDB()

  }

  async setDB()
  {
    await this.db.execSQL('create table IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INT NOT NULL)','LOADING PRODUCT : OK')
    await this.db.execSQL('create table IF NOT EXISTS recipe(id INT NOT NULL, name TEXT NOT NULL, idProduct INT NOT NULL, quantity INT NOT NULL, recipePrice INT NOT NULL)','LOADING RECIPE : OK')
    await this.db.execSQL('create table IF NOT EXISTS list(id INT NOT NULL, idRecette INT NOT NULL)','LOADING LIST : OK')
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


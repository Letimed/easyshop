import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavigationPage } from '../Navigation/navigation';
import { ListePage } from '../ListesDeCourses/liste';
import { OptionPage } from '../options/options';
import { ProduitPage } from '../produits/produits';
import { RecettePage } from '../Recette/recette';
import { mesRecettes } from '../mesRecettes/mesRecettes';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  userProfile: any = null;


  constructor(public navCtrl: NavController, private push: Push) {}

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
    this.navCtrl.push(OptionPage);
  }

  settingButton() {
  	console.log("click settingButton");
  }

  facebookButton() {
  	console.log("click facebookButton");
  }

  pushNotif()
  {
  this.push.hasPermission().then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

  const options: PushOptions = {
   android: {},
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
   };

   const pushObject: PushObject = this.push.init(options);

     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}


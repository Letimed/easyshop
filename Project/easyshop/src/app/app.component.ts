import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
<<<<<<< HEAD
import { RecettePage } from '../pages/Recette/recette';
import { LoginPage } from '../pages/Login/login';
//import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';
=======
import { ListePage } from '../pages/ListesDeCourses/liste';
import { OptionPage } from '../pages/options/options';
import { ProduitPage } from '../pages/produits/produits';
import { RecettePage } from '../pages/recettes/recettes';
import { Firebase } from '@ionic-native/firebase';
>>>>>>> abb192e1bf236cddd10d6a7d989b429aa18f844c
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

<<<<<<< HEAD
  fireconfig = {
    apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
    authDomain: "easyshoppy-5f0d7.firebaseapp.com",
    databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
    projectId: "easyshoppy-5f0d7",
    storageBucket: "easyshoppy-5f0d7.appspot.com",
    messagingSenderId: "378512581486"
  };

  constructor(private fb: Facebook, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  firebase.initializeApp(this.fireconfig);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Navigation', component: NavigationPage },
      { title: 'Ajouter recette', component: RecettePage },
      { title: 'login', component: LoginPage }
=======
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen/**, private firebase: Firebase */) {
  this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Listes de courses', component: ListePage },
      { title: 'Ajouter un produit', component: ProduitPage },
      { title: 'Ajouter une recette', component: RecettePage },
      { title: 'Magasins Alentours', component: NavigationPage },
      { title: 'Options', component: OptionPage }
>>>>>>> abb192e1bf236cddd10d6a7d989b429aa18f844c
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //TEST FB CONNECT
      //this.fb.login(['public_profile', 'user_friends', 'email'])
        //.then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        //.catch(e => console.log('Error logging into Facebook', e));
        //this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

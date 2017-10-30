import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { RecettePage } from '../pages/Recette/recette';
import { LoginPage } from '../pages/Login/login';
//import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

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
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

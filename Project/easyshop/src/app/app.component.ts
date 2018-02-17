import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { RecettePage } from '../pages/Recette/recette';
import { ListePage } from '../pages/ListesDeCourses/liste';
import { ProduitPage } from '../pages/produits/produits';
import { mesRecettes } from '../pages/mesRecettes/mesRecettes';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{icon: string, title: string, component: any}>;

  fireconfig = {
    apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
    authDomain: "easyshoppy-5f0d7.firebaseapp.com",
    databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
    projectId: "easyshoppy-5f0d7",
    storageBucket: "easyshoppy-5f0d7.appspot.com",
    messagingSenderId: "378512581486"
  };

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  this.initializeApp();
    this.pages = [
      { icon: 'home', title: 'Accueil', component: HomePage },
      { icon: 'nutrition', title: 'Ajouter un produit', component: ProduitPage },
      { icon: 'flask', title: 'Ajouter une recette', component: RecettePage },
      { icon: 'list', title: 'Mes recettes', component: mesRecettes },
      { icon: 'list-box', title: 'Listes de courses', component: ListePage },
      { icon: 'pin', title: 'Magasins alentours', component: NavigationPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

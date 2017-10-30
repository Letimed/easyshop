import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { ListePage } from '../pages/ListesDeCourses/liste';
import { OptionPage } from '../pages/options/options';
import { ProduitPage } from '../pages/produits/produits';
import { RecettePage } from '../pages/recettes/recettes';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen/**, private firebase: Firebase */) {
  this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Listes de courses', component: ListePage },
      { title: 'Ajouter un produit', component: ProduitPage },
      { title: 'Ajouter une recette', component: RecettePage },
      { title: 'Magasins Alentours', component: NavigationPage },
      { title: 'Options', component: OptionPage }
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

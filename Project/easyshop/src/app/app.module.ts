import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { RecettePage } from '../pages/Recette/recette';
import { LoginPage } from '../pages/Login/login';
import { ListePage } from '../pages/ListesDeCourses/liste'
import { OptionPage } from '../pages/options/options';
import { ProduitPage } from '../pages/produits/produits';
import { mesRecettes } from '../pages/mesRecettes/mesRecettes';
import { DetailRecette } from '../pages/detailRecette/detailRecette';
import { generateList } from '../pages/GenerateListe/generateList';
import { affichageRecette } from '../pages/affichageRecette/affichageRecette';
import { MenuListPage } from '../pages/menu-list/menu-list';

import { Firebase } from '@ionic-native/firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps'
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule} from '@angular/http'; import { Facebook } from '@ionic-native/facebook';
import { OneSignal } from '@ionic-native/onesignal';
import { DatabaseProvider } from '../providers/database/database';



export const config = {
      apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
      authDomain: "easyshoppy-5f0d7.firebaseapp.com",
      databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
      projectId: "easyshoppy-5f0d7",
      storageBucket: "",
      messagingSenderId: "378512581486"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NavigationPage,
    LoginPage,
    ListePage,
    OptionPage,
    ProduitPage,
    RecettePage,
    mesRecettes,
    DetailRecette,
    generateList,
    affichageRecette,
    MenuListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NavigationPage,
    LoginPage,
    ListePage,
    OptionPage,
    ProduitPage,
    RecettePage,
    mesRecettes,
    DetailRecette,
    generateList,
    affichageRecette,
    MenuListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    Geolocation,
    GoogleMaps,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    SQLite,
    DatabaseProvider,
  ]
})
export class AppModule {}

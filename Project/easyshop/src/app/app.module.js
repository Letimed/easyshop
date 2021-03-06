var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { RecettePage } from '../pages/Recette/recette';
import { LoginPage } from '../pages/Login/login';
import { ListePage } from '../pages/ListesDeCourses/liste';
import { OptionPage } from '../pages/options/options';
import { ProduitPage } from '../pages/produits/produits';
import { mesRecettes } from '../pages/mesRecettes/mesRecettes';
import { DetailRecette } from '../pages/detailRecette/detailRecette';
import { generateList } from '../pages/GenerateListe/generateList';
import { affichageRecette } from '../pages/affichageRecette/affichageRecette';
import { Firebase } from '@ionic-native/firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { ShopService } from '../providers/shop-service/shop-service';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { OneSignal } from '@ionic-native/onesignal';
import { DatabaseProvider } from '../providers/database/database';
export var config = {
    apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
    authDomain: "easyshoppy-5f0d7.firebaseapp.com",
    databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
    projectId: "easyshoppy-5f0d7",
    storageBucket: "",
    messagingSenderId: "378512581486"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                affichageRecette
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
                affichageRecette
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Firebase,
                Geolocation,
                GoogleMaps,
                Facebook,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                PeopleServiceProvider,
                ShopService,
                OneSignal,
                SQLite,
                DatabaseProvider,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
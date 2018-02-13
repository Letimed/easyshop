var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NavigationPage } from '../pages/Navigation/navigation';
import { RecettePage } from '../pages/Recette/recette';
import { LoginPage } from '../pages/Login/login';
import { ListePage } from '../pages/ListesDeCourses/liste';
import { OptionPage } from '../pages/options/options';
import { ProduitPage } from '../pages/produits/produits';
import { mesRecettes } from '../pages/mesRecettes/mesRecettes';
import { OnlineProductPage } from '../pages/online-product/online-product'

var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = HomePage;
        this.fireconfig = {
            apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
            authDomain: "easyshoppy-5f0d7.firebaseapp.com",
            databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
            projectId: "easyshoppy-5f0d7",
            storageBucket: "easyshoppy-5f0d7.appspot.com",
            messagingSenderId: "378512581486"
        };
        this.initializeApp();
        this.pages = [
            { title: 'Accueil', component: HomePage },
            { title: 'Listes de courses', component: ListePage },
            { title: 'Ajouter un produit', component: ProduitPage },
            { title: 'Ajouter une recette', component: RecettePage },
            { title: 'Magasins Alentours', component: NavigationPage },
            { title: 'Options', component: OptionPage },
            { title: 'login', component: LoginPage },
            { title: 'ajouter recette', component: RecettePage },
            { title: 'mesRecettes', component: mesRecettes }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map
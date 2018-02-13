var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavigationPage } from '../Navigation/navigation';
import { ListePage } from '../ListesDeCourses/liste';
import { ProduitPage } from '../produits/produits';
import { RecettePage } from '../Recette/recette';
import { mesRecettes } from '../mesRecettes/mesRecettes';
import { OneSignal } from '@ionic-native/onesignal';
import { LoginPage } from '../Login/login';
import { Http } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
var HomePage = /** @class */ (function () {
    function HomePage(db, navCtrl, oneSignal, http, sqlite) {
        this.db = db;
        this.navCtrl = navCtrl;
        this.oneSignal = oneSignal;
        this.http = http;
        this.sqlite = sqlite;
        this.userProfile = null;
        //
        // ONESIGNAL INIT
        //
        this.oneSignal.startInit('f1c036d3-cd14-411b-846b-d5400c9edcc1', '378512581486');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(function () {
        });
        this.oneSignal.handleNotificationOpened().subscribe(function () {
        });
        this.oneSignal.endInit();
        //
        //ONE SIGNAL END
        //
        this.setDB();
    }
    HomePage.prototype.setDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execSQL('create table IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INT NOT NULL)', 'LOADING PRODUCT : OK')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.db.execSQL('create table IF NOT EXISTS recipe(id INT NOT NULL, name TEXT NOT NULL, idProduct INT NOT NULL, quantity INT NOT NULL, recipePrice INT NOT NULL)', 'LOADING RECIPE : OK')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.db.execSQL('create table IF NOT EXISTS list(id INT NOT NULL, name TEXT NOT NULL, idRecette INT NOT NULL, listPrice INT NOT NULL)', 'LOADING LIST : OK')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.db.execSQL('INSERT INTO recipe VALUES (0, \'Soupe au choux\', 0, 1, 42)', 'INSERT RECIPE')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.db.execSQL('INSERT INTO recipe VALUES (0, \'Soupe a l oignons\', 0, 1, 42)', 'INSERT RECIPE')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.geoLocButton = function () {
        this.navCtrl.push(NavigationPage);
    };
    HomePage.prototype.listeButton = function () {
        this.navCtrl.push(ListePage);
    };
    HomePage.prototype.produitButton = function () {
        this.navCtrl.push(ProduitPage);
    };
    HomePage.prototype.recetteButton = function () {
        this.navCtrl.push(RecettePage);
    };
    HomePage.prototype.mesRecetteButton = function () {
        this.navCtrl.push(mesRecettes);
    };
    HomePage.prototype.optionButton = function () {
        //this.navCtrl.push(OptionPage);
    };
    HomePage.prototype.settingButton = function () {
        console.log("click settingButton");
    };
    HomePage.prototype.facebookButton = function () {
        console.log("click facebookButton");
        this.navCtrl.push(LoginPage);
    };
    HomePage.prototype.pushNotif = function () {
        var _this = this;
        console.log("PushNotifButton");
        this.oneSignal.getIds().then(function (ids) {
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
            _this.http.post('https://onesignal.com/api/v1/notifications', body).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [DatabaseProvider, NavController, OneSignal, Http, SQLite])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
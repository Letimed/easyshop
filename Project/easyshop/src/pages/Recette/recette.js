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
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { mesRecettes } from '../mesRecettes/mesRecettes';
var RecettePage = /** @class */ (function () {
    function RecettePage(storage, toastCtrl, alertCtrl, navCtrl) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.searchQuery = '';
        this.items = [];
        this.recette = [];
        this.initializeItems();
    }
    RecettePage.prototype.initializeItems = function () {
        var _this = this;
        var i = 0;
        this.storage.forEach(function (index, key, value) {
            if (key != null && key[0] == "P") {
                var parsedKey = key.split("_");
                var parsedValue = index.split("~");
                _this.items[i] = parsedKey[1];
                i++;
            }
        });
    };
    RecettePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    RecettePage.prototype.addRecette = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast, toast, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.recette == null)) return [3 /*break*/, 1];
                        toast = this.toastCtrl.create({
                            message: 'recette inéxistante',
                            duration: 3000
                        });
                        toast.present();
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.recetteName == null)) return [3 /*break*/, 2];
                        toast = this.toastCtrl.create({
                            message: 'Entrez un nom pour votre recette',
                            duration: 3000
                        });
                        toast.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.storage.set("R_" + this.recetteName, this.recette)];
                    case 3:
                        _a.sent();
                        toast = this.toastCtrl.create({
                            message: 'La recette a bien été ajouté',
                            duration: 3000
                        });
                        toast.present();
                        this.clearAll();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RecettePage.prototype.debug = function () {
        this.storage.get('R_chili').then(function (val) {
            console.log('chili : ', val);
        });
    };
    RecettePage.prototype.clearAll = function () {
        this.recetteName = null;
        this.recette = null;
    };
    RecettePage.prototype.getListRecette = function () {
        var _this = this;
        var i = 0;
        this.storage.forEach(function (index, key, value) {
            if (key != null && key[0] == "R") {
                var parsedKey = key.split("_");
                var parsedValue = index.split("~");
                _this.recette[i] = parsedKey[1];
                i++;
            }
        });
    };
    RecettePage.prototype.itemSelected = function (item) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Ajout du Produit',
            message: "Quelle quantité souhaité vous ajouté ?",
            inputs: [
                {
                    name: 'quantity',
                    placeholder: 'Quantité'
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Ajouter',
                    handler: function (data) {
                        _this.recette.push(item + ":" + data.quantity);
                    }
                }
            ]
        });
        prompt.present();
    };
    RecettePage.prototype.goToMesRecettes = function () {
        this.navCtrl.push(mesRecettes);
    };
    RecettePage = __decorate([
        Component({
            selector: 'page-recette',
            templateUrl: 'recette.html'
        }),
        __metadata("design:paramtypes", [Storage, ToastController, AlertController, NavController])
    ], RecettePage);
    return RecettePage;
}());
export { RecettePage };
//# sourceMappingURL=recette.js.map
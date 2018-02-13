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
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
var ProduitPage = /** @class */ (function () {
    function ProduitPage(db, navCtrl, storage, toastCtrl, alertCtrl, sqlite) {
        this.db = db;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
        this.product = [];
        this.fillProduct();
    }
    ProduitPage.prototype.addProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.productPrice == null)
                            this.productPrice = 0;
                        if (!(this.productName != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.checkName()];
                    case 1:
                        if ((_a.sent()) == true)
                            return [2 /*return*/];
                        this.product[this.product.length] = "Produit : \'" + this.productName + "\' Prix : " + this.productPrice + "€";
                        return [4 /*yield*/, this.db.execSQL('INSERT INTO product (name, price) VALUES (\'' + this.productName + '\',\'' + this.productPrice + '\')', 'Insert Product')];
                    case 2:
                        _a.sent();
                        toast = this.toastCtrl.create({
                            message: 'Le produit a bien été ajouté',
                            duration: 3000
                        });
                        toast.present();
                        return [3 /*break*/, 4];
                    case 3:
                        this.doToast('Nom de produit incorrect');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProduitPage.prototype.fillProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.product = [];
                        return [4 /*yield*/, this.db.execSQL("SELECT * FROM product", "Get all product")];
                    case 1:
                        _a.sent();
                        i = 0;
                        while (i < this.db.cmd.rows.length) {
                            this.product[i] = 'Produit : \'' + this.db.cmd.rows.item(i).name + '\' Prix : \'' + this.db.cmd.rows.item(i).price + '\' €';
                            i = i + 1;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProduitPage.prototype.checkName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execSQL('SELECT * from product where name=\'' + this.productName + '\'', 'GET NAME DB')];
                    case 1:
                        _a.sent();
                        if (this.db.cmd.rows.length == 0) {
                            return [2 /*return*/, false];
                        }
                        else
                            this.doToast('Le produit existe déjà');
                        return [2 /*return*/];
                }
            });
        });
    };
    ProduitPage.prototype.showConfirm = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var confirm;
            return __generator(this, function (_a) {
                confirm = this.alertCtrl.create({
                    title: 'Supprimer ?',
                    message: 'Êtes-vous sûr de vouloir supprimer définitivement se produit ?',
                    buttons: [
                        {
                            text: 'Non',
                            handler: function () {
                            }
                        },
                        {
                            text: 'Oui',
                            handler: function () {
                                var stringToRm = item.split("\'");
                                _this.db.execSQL('DELETE FROM product WHERE name =\'' + stringToRm[1] + '\'', 'Delete Product');
                                _this.fillProduct();
                                var toast = _this.toastCtrl.create({
                                    message: 'Produit supprimé',
                                    duration: 3000
                                });
                                toast.present();
                            }
                        }
                    ]
                });
                confirm.present();
                return [2 /*return*/];
            });
        });
    };
    ProduitPage.prototype.doToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    ProduitPage = __decorate([
        Component({
            selector: 'page-produit',
            templateUrl: 'produits.html',
        }),
        __metadata("design:paramtypes", [DatabaseProvider, NavController, Storage, ToastController, AlertController, SQLite])
    ], ProduitPage);
    return ProduitPage;
}());
export { ProduitPage };
//# sourceMappingURL=produits.js.map
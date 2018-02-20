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
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';
import { ListePage } from '../ListesDeCourses/liste';
var generateList = /** @class */ (function () {
    function generateList(db, navCtrl, toastCtrl, storage) {
        this.db = db;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.items = [];
        this.recette = [];
        this.myRecette = [];
        this.fillName();
    }
    generateList.prototype.fillName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execSQL("Select DISTINCT name FROM recipe", "SELECT ALL RECIPE")];
                    case 1:
                        _a.sent();
                        i = 0;
                        while (i < this.db.cmd.rows.length) {
                            this.items[i] = this.db.cmd.rows.item(i).name;
                            i = i + 1;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    generateList.prototype.showList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idList, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idList = 0;
                        i = 0;
                        return [4 /*yield*/, this.checkName()];
                    case 1:
                        if ((_a.sent()) == true)
                            return [2 /*return*/];
                        if (this.listName == "") {
                            this.doToast("Nom de liste vide");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.db.execSQL('Select id from list order by id desc', 'Get ID LIST')];
                    case 2:
                        _a.sent();
                        if (this.db.cmd.rows.length == 0)
                            idList = 0;
                        else
                            idList = this.db.cmd.rows.item(0).id + 1;
                        console.log(idList);
                        _a.label = 3;
                    case 3:
                        if (!(i < this.items.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.db.execSQL('SELECT DISTINCT id from recipe where name=\'' + this.items[i] + '\' ', 'Get Recipes IDs')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.db.execSQL('INSERT INTO LIST VALUES (' + idList + ',\'' + this.listName + '\', ' + this.db.cmd.rows.item(0).id + ', -1)', 'INSERT LIST')];
                    case 5:
                        _a.sent();
                        i = i + 1;
                        return [3 /*break*/, 3];
                    case 6:
                        this.doToast("Liste " + this.listName + " ajouté");
                        this.navCtrl.push(ListePage);
                        return [2 /*return*/];
                }
            });
        });
    };
    generateList.prototype.checkName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execSQL('SELECT * from list where name=\'' + this.listName + '\'', 'GET NAME DB')];
                    case 1:
                        _a.sent();
                        console.log(this.db.cmd.rows.item(0));
                        if (this.db.cmd.rows.length == 0) {
                            return [2 /*return*/, false];
                        }
                        else {
                            this.doToast('Une liste du même nom existe');
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    generateList.prototype.doToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    generateList.prototype.addRecette = function (recetteName) {
        this.myRecette.push(recetteName);
    };
    generateList = __decorate([
        Component({
            selector: 'page-generateList',
            templateUrl: 'generateList.html',
        }),
        __metadata("design:paramtypes", [DatabaseProvider, NavController, ToastController, Storage])
    ], generateList);
    return generateList;
}());
export { generateList };
//# sourceMappingURL=generateList.js.map
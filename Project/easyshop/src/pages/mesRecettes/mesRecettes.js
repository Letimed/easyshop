var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailRecette } from '../detailRecette/detailRecette';
var mesRecettes = /** @class */ (function () {
    function mesRecettes(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.items = [];
        this.recette = [];
        this.initializeItems();
    }
    mesRecettes.prototype.initializeItems = function () {
        var _this = this;
        var i = 0;
        this.storage.forEach(function (index, key, value) {
            if (key != null && key[0] == "R") {
                var parsedKey = key.split("_");
                //let parsedValue = index.split("~");
                _this.items[i] = parsedKey[1];
                i++;
            }
        });
    };
    mesRecettes.prototype.itemSelected = function (item) {
        this.recette.push(item);
        this.navCtrl.push(DetailRecette, { selectedRecette: this.recette });
        this.recette = [];
    };
    mesRecettes = __decorate([
        Component({
            selector: 'page-mesRecettes',
            templateUrl: 'mesRecettes.html',
        }),
        __metadata("design:paramtypes", [NavController, Storage])
    ], mesRecettes);
    return mesRecettes;
}());
export { mesRecettes };
//# sourceMappingURL=mesRecettes.js.map
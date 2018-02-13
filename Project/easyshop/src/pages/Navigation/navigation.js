var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { ShopService } from '../../providers/shop-service/shop-service';
var NavigationPage = /** @class */ (function () {
    function NavigationPage(navCtrl, geolocation, _googleMaps, shopService) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this._googleMaps = _googleMaps;
        this.shopService = shopService;
        this.geolocation.getCurrentPosition().then(function (position) {
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    }
    NavigationPage.prototype.getLocation = function () {
        return this.geolocation.getCurrentPosition();
    };
    NavigationPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initMap();
        this.map.one(GoogleMapsEvent.MAP_READY).then(function () {
            console.log("test");
            _this.getLocation().then(function (res) {
                console.log("test2");
                var loc = new LatLng(res.coords.latitude, res.coords.longitude);
                _this.moveCamera(loc);
                _this.createMarker(loc, "Moi").then(function (marker) {
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                    marker.showInfoWindow();
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    NavigationPage.prototype.setShopMarker = function () {
        var unirest = require('unirest');
        var a = this;
        a.getLocation().then(function (res) {
            var myLat = res.coords.latitude;
            var myLong = res.coords.longitude;
            unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
                .header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
                .header("Accept", "application/json")
                .end(function (result) {
                for (var _i = 0, _a = result.body; _i < _a.length; _i++) {
                    var i = _a[_i];
                    unirest.get("https://datagram-products-v1.p.mashape.com/chains/" + i.id + "/stores/")
                        .header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
                        .header("Accept", "application/json")
                        .end(function (resb) {
                        for (var _i = 0, _a = resb.body; _i < _a.length; _i++) {
                            var j = _a[_i];
                            if (j.name == undefined) {
                                return;
                            }
                            if (j.latitude > myLat - 0.25 && j.latitude < myLat + 0.25) {
                                if (j.longitude > myLong - 0.25 && j.longitude < myLong + 0.25) {
                                    //console.log(j.latitude + " " + j.longitude + " : " + j.name);
                                    var mark = new LatLng(j.latitude, j.longitude);
                                    a.createMarker(mark, j.name).then(function (marker) {
                                        marker.showInfoWindow();
                                    }).catch(function (err) {
                                        console.log(err);
                                    });
                                }
                            }
                        }
                    });
                }
            });
        });
    };
    NavigationPage.prototype.initMap = function () {
        var element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element);
        this.setShopMarker();
    };
    NavigationPage.prototype.moveCamera = function (loc) {
        var options = {
            target: loc,
            zoom: 18,
            tilt: 25
        };
        this.map.moveCamera(options);
    };
    NavigationPage.prototype.createMarker = function (loc, title) {
        var markerOptions = {
            position: loc,
            title: title
        };
        return this.map.addMarker(markerOptions);
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], NavigationPage.prototype, "mapElement", void 0);
    NavigationPage = __decorate([
        Component({
            selector: 'page-navigation',
            templateUrl: 'navigation.html'
        }),
        __metadata("design:paramtypes", [NavController, Geolocation, GoogleMaps, ShopService])
    ], NavigationPage);
    return NavigationPage;
}());
export { NavigationPage };
//# sourceMappingURL=navigation.js.map
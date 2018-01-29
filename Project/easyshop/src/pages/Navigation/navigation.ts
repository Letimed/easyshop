import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap,Marker, MarkerOptions, CameraPosition, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps'
import { ShopService } from '../../providers/shop-service/shop-service';
declare var require: any


@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})

export class NavigationPage {
	@ViewChild('map') mapElement: ElementRef;
	map: GoogleMap;

  constructor(public navCtrl: NavController,private geolocation: Geolocation, private _googleMaps: GoogleMaps,public shopService: ShopService) {
  	console.log("before position get !")
  	this.geolocation.getCurrentPosition().then((position) => {
  		console.log("Position get ! ");
	}).catch((error) => {
	  console.log('Error getting location', error);
	});

  }
  	getLocation(){
  		return this.geolocation.getCurrentPosition();
  	}

  	ngAfterViewInit() {
		this.initMap();
		this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
			console.log("test");
			this.getLocation().then( res => {
				console.log("test2");
				let loc = new LatLng(res.coords.latitude, res.coords.longitude);
				this.moveCamera(loc);

				this.createMarker(loc, "Moi").then((marker: Marker) => {
					marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
					marker.showInfoWindow();
				}).catch(err => {
					console.log(err);
				})

			}).catch( err => {
				console.log(err);
			})
		})
	}

	setShopMarker()
	{
		var unirest = require('unirest');
		var a = this;
		a.getLocation().then(res => {
			var myLat = res.coords.latitude;
			var myLong = res.coords.longitude;
		

		unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
    	.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
    	.header("Accept", "application/json")
    	.end(function (result) {
    		for(let i of result.body)
    		{
    			unirest.get("https://datagram-products-v1.p.mashape.com/chains/"+ i.id +"/stores/")
				.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
				.header("Accept", "application/json")
				.end(function (resb){
					for (let j of resb.body)
					{
						if (j.name == undefined)
						{
							return ;
						}
						if (j.latitude > myLat - 0.25 && j.latitude < myLat + 0.25)
						{
							if (j.longitude > myLong - 0.25 && j.longitude < myLong + 0.25)
							{
						//console.log(j.latitude + " " + j.longitude + " : " + j.name);
						let mark = new LatLng(j.latitude,j.longitude);
						a.createMarker(mark, j.name).then((marker: Marker) => {
							marker.showInfoWindow();
						}).catch(err => {
							console.log(err);
						});}}
					}
				});
    		}
    	});
    	});
	}

	initMap(){
		let element = this.mapElement.nativeElement;
		this.map = this._googleMaps.create(element);
		//this.setShopMarker();
	}

	moveCamera(loc: LatLng){
		let options: CameraPosition<any> = {
			target: loc,
			zoom: 15,
			tilt: 10
		};
		this.map.moveCamera(options)
	}

	createMarker(loc: LatLng, title: string){
		let markerOptions: MarkerOptions= {
			position: loc,
			title: title
		};
		return this.map.addMarker(markerOptions);
	}

	}
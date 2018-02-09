import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap,Marker, MarkerOptions, CameraPosition, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps'
declare var require: any


@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})


export class NavigationPage {
	@ViewChild('map') mapElement: ElementRef;
	map: GoogleMap;



  constructor(public navCtrl: NavController,private geolocation: Geolocation, private _googleMaps: GoogleMaps) {
  	this.geolocation.getCurrentPosition().then((position) => {
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

			unirest.get("https://datagram-products-v1.p.mashape.com/retailers/")
			.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
			.header("Accept", "application/json")
			.end(function (result) {
  			for (let i of result.body)
  				{
  					for (let j of i.stores)
  					{
  						if (j.store_name == undefined)
  						{
  							return ;
  						}
  						if (j.store_lat > myLat - 0.25 && j.store_lat < myLat + 0.25)
						{
							if (j.store_lon > myLong - 0.25 && j.store_lon < myLong + 0.25)
							{
							let mark = new LatLng(j.store_lat,j.store_lon);
							a.createMarker(mark, j.store_name).then((marker: Marker) => {
							marker.showInfoWindow();
							}).catch(err => {
								console.log(err);
								});
							}
						}
  			}
  		}
		});
		});
	}

	initMap(){
		let element = this.mapElement.nativeElement;
		this.map = this._googleMaps.create(element);
		this.setShopMarker();
	}

	moveCamera(loc: LatLng){
		let options: CameraPosition<any> = {
			target: loc,
			zoom: 18,
			tilt: 25
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
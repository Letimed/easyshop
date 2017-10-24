import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps, GoogleMap,Marker, MarkerOptions, CameraPosition, LatLng, GoogleMapsEvent} from '@ionic-native/google-maps'


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
			this.getLocation().then( res => {
				let loc = new LatLng(res.coords.latitude, res.coords.longitude);
				this.moveCamera(loc);

				this.createMarker(loc, "Moi").then((marker: Marker) => {
					marker.showInfoWindow();
				}).catch(err => {
					console.log(err);
				})
			}).catch( err => {
				console.log(err);
			})
		})
	}

	initMap(){
		let element = this.mapElement.nativeElement;
		this.map = this._googleMaps.create(element)
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
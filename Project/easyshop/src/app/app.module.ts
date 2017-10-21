import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CallApi } from '../pages/CallApi/CallApi';
import { NavigationPage } from '../pages/navigation/navigation';
import { Firebase } from '@ionic-native/firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps'
import { IonicStorageModule } from '@ionic/storage';
import { PeopleServiceProvider } from '../providers/people-service/people-service';

export const config = {
   apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
      authDomain: "easyshoppy-5f0d7.firebaseapp.com",
      databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
      projectId: "easyshoppy-5f0d7",
      storageBucket: "",
      messagingSenderId: "378512581486"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CallApi,
    NavigationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CallApi,
    NavigationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeopleServiceProvider
  ]
})
export class AppModule {}

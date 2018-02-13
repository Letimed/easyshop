import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineProductPage } from './online-product';

@NgModule({
  declarations: [
    OnlineProductPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineProductPage),
  ],
})
export class OnlineProductPageModule {}

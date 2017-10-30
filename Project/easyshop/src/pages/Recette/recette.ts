import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html'
})

export class RecettePage {

  searchQuery: string = '';
  items: string[];
  recette: any[] = [];

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3',
      'ingredient 4',
      'ingredient 5',
      'ingredient 6',
      'ingredient 7',
      'ingredient 8',
      'ingredient 9',
      'ingredient 10',
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addRecette() {
  // create recette in locale storage
  }

  itemSelected(item: string) {
      console.log("Selected Item", item);
      this.recette.push(item);
    }
}

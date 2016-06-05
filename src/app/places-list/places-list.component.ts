import { Component, Input, OnInit } from '@angular/core';

import { Place } from '../place';
import { PlaceDetailsComponent } from '../place-details/place-details.component';
@Component({
  moduleId: module.id,
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html',
  directives: [PlaceDetailsComponent]
})
export class PlacesListComponent implements OnInit {

  @Input() places:Place[];
  @Input() selected:Place;
  
  constructor() {}

  ngOnInit() {
  }

  /**
   * Creates a single character label for a marker.
   */
  getLabel(index:number):string {
    return String.fromCharCode(65+index);
  }
  
  selectPlace(place:Place) {
    this.selected = place;
  }

}

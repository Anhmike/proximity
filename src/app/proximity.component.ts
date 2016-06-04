import { Component } from '@angular/core';

import { PlacesService } from './places.service';
import { Place } from './place';

import { PlacesListComponent } from './places-list/places-list.component';

@Component({
  moduleId: module.id,
  selector: 'proximity-app',
  templateUrl: 'proximity.component.html',
  providers: [PlacesService],
  directives: [PlacesListComponent]
})
export class ProximityAppComponent {

  places:Place[] = [];
  
  constructor(placesService:PlacesService) {
    this.places = placesService.getPlaces("");
  }
  
  searchCurrentLocation() {
     console.log("search current location")
  }
  
  searchCity() {
     console.log("search city")
  }
}

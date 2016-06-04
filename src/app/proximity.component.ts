import { Component } from '@angular/core';

import { PlacesService } from './places.service';
import { Place } from './place';

import { PlacesListComponent } from './places-list/places-list.component';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
  moduleId: module.id,
  selector: 'proximity-app',
  templateUrl: 'proximity.component.html',
  providers: [PlacesService],
  directives: [PlacesListComponent, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styleUrls: ['proximity.component.css']
})
export class ProximityAppComponent {

  places:Place[] = [];
    lat: number = 51.678418;
  lng: number = 7.809007;

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

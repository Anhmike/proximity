import { Component, OnInit } from '@angular/core';

import { PlacesService } from './places.service';
import { Place, Location } from './place';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import { SearchComponent } from './search/search.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'proximity-app',
  templateUrl: 'proximity.component.html',
  providers: [PlacesService, UserService],
  directives: [SearchComponent, PlacesListComponent, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styleUrls: ['proximity.component.css']
})
export class ProximityAppComponent {

  // currently logged in user
  user:string;
  
  places: Place[] = [];
  selectedPlace: Place;

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private placesService: PlacesService, private userService:UserService) { }

  ngOnInit() {
    this.userService.user.subscribe(user => this.user = user);
  }
  
  clickMarker(place: Place) {
    this.selectedPlace = place;
  }
  
  handleSearchResult(result:any) {
    let location:Location = result.location;
    let places:Place[] = result.results;
    
    this.places = places;
    this.lat = location.lat;
    this.lng = location.lng;
    this.selectedPlace = null;
  }
  
  /**
   * Creates a single character label for a marker.
   */
  getLabel(index:number):string {
    return String.fromCharCode(65+index);
  }
}

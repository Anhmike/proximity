import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { PlacesService } from '../places.service';
import { Place, Location } from '../place';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

  // Event emitter
  @Output() searchResults = new EventEmitter();

  // Control for address search
  private search = new Control();
  
  // Internal state for UI
  private searchingLocation = false;
  private searchingPlaces = false;
  
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
  }

  searchCurrentLocation() {
    console.log("search current location");
    if (navigator.geolocation) {
      this.searchingLocation = true;
      navigator.geolocation.getCurrentPosition((p) => {
        let location:Location = {
          lat : p.coords.latitude,
          lng : p.coords.longitude
        }
        this.searchingLocation = false;
        this.performPlaceSearch(location);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  searchCity() {
    console.log("search city " + this.search.value);
    this.searchingPlaces = true;
    
    this.placesService
      .getLocation(this.search.value)
      .subscribe(location => this.performPlaceSearch(location));
  }
  
  searchKeyPressed(event:any) {
    console.log(event);
    if (event.keyCode == 13) {
      this.searchCity();
    }
  }
  
  performPlaceSearch(location:Location) {
    console.log("Searching for places in location " + location.lng + "/" + location.lat);
    this.searchingPlaces = true;
    
    this.placesService.findPlaces(location).subscribe(
      (result) => {
        this.searchingPlaces = false;
        console.log(result);
        this.searchResults.emit(result);
      },
      (error) => {
        this.searchingPlaces = false;
        console.log("ERROR: ");
        console.log(JSON.stringify(error));
      }
    );   
  }
}

import { Component, Input, OnChanges } from '@angular/core';

import {PlacesService} from '../places.service';
import {Place, PlaceDetails} from '../place';

@Component({
  moduleId: module.id,
  selector: 'app-place-details',
  templateUrl: 'place-details.component.html'
})
export class PlaceDetailsComponent implements OnChanges {

  @Input() place:Place;
  
  private details:PlaceDetails;
  
  constructor(private placesService:PlacesService) {}

  ngOnChanges() {
    console.log("Changes: " + this.place);
    if (this.place != null) {
      this.placesService.getDetails(this.place).subscribe(details => {
        console.log("DETAILS: ");
        console.log(details);
        this.details = details;
      });
    } else {
      this.details = null;
    }
  }
}

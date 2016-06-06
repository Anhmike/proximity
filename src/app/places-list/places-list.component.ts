import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { Place } from '../place';
import { PlaceDetailsComponent } from '../place-details/place-details.component';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html',
  directives: [PlaceDetailsComponent]
})
export class PlacesListComponent implements OnInit, OnChanges {

  @Input() places: Place[];
  @Input() selected: Place;

  // stores if we are attending in a place
  attending:boolean[];
  user: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
      this.ngOnChanges();
    });
  }

  ngOnChanges() {
    if (this.places!=null) {
      this.attending = new Array(this.places.length);
      for (let i=0; i<this.places.length; i++) {
        this.userService.getAttending(this.user, this.places[i])
          .subscribe(o =>this.attending[i] = o != null);
      }
    }
  }

  /**
   * Creates a single character label for a marker.
   */
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  selectPlace(place: Place) {
    this.selected = place;
  }

  attend(place: Place) {
    console.log("user " + this.user + " attending place " + place.name);
    this.userService.attend(this.user, place);
  }

  leave(place: Place) {
    console.log("user " + this.user + " leaving place " + place.name);
    this.userService.leave(this.user, place);
  }

  isAttending(index: number) {
    return this.attending[index];
  }
}

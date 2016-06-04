import { Component, Input, OnInit } from '@angular/core';

import { Place } from '../place';

@Component({
  moduleId: module.id,
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html'
})
export class PlacesListComponent implements OnInit {

  @Input() places:Place[];
  
  constructor() {}

  ngOnInit() {
  }

}

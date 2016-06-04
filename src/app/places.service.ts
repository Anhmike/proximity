import { Injectable } from '@angular/core';

import { Place } from './place';

@Injectable()
export class PlacesService {

  constructor() {}

  getPlaces(location:any):Place[] {
    return [{name:"A bar", type:'bar'}, {name:"A restaurant", type:'restaurant'}, {name:'A cafe', type:'cafe'}]
  }
}

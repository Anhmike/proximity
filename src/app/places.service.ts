import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Place, PlaceDetails, Location } from './place';
import { GoogleMapsAPIWrapper, LazyMapsAPILoaderConfig, LazyMapsAPILoader } from 'angular2-google-maps/core';

const KEY = 'AIzaSyD90zqxTa46SdMqSeM529xHF5Ye9DBkyTM';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const CROSS_ORIGIN_URL = 'https://cors-anywhere.herokuapp.com/';
const PLACES_URL = CROSS_ORIGIN_URL + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const PLACE_DETAILS_URL = CROSS_ORIGIN_URL + 'https://maps.googleapis.com/maps/api/place/details/json';


@Injectable()
export class PlacesService {

  constructor(private http: Http) {
  }

  /**
   * Returns a location for an address.
   * 
   * The method uses Google's Geolocation API. For instance, to lookup the location
   * of the city Buenos Aires, the following request is performed:
   * https://maps.googleapis.com/maps/api/geocode/json?&address=Buenos%20Aires
   * The result is then mapped into a Location type which contains lon/lat data.
   */
  getLocation(address:string):Observable<Location> {
    console.log("Geocoding address " + address);
    
    let params: URLSearchParams = new URLSearchParams();
    params.set('address', address);

    return this.http
      .get(GEOCODE_URL, { search: params })
      .map(response => response.json())
      .map(object => <Location>object.results[0].geometry.location);
  }
  
  /**
   * Get the details of a specific place.
   */
  getDetails(place:Place): Observable<PlaceDetails> {
    console.log("Finding details for place " + place.name);
    let params: URLSearchParams = new URLSearchParams();
    params.set('placeid', place.id);
    params.set('key', KEY);

    return this.http
      .get(PLACE_DETAILS_URL, { search: params })
      .map(response => response.json())
      .map(object => object.result)
      .map(object => this.mapPlaceDetails(object));
  }
  
  /**
   * Maps the data structure of a place's details returned from the Google Places API to our internal model.
   */
  private mapPlaceDetails(object:any):PlaceDetails {
    return {
      address: object.formatted_address,
      phone: object.international_phone_number,
      openingHours: object.openingHours ? object.openingHours.weekdayText : [],
      rating: object.rating,
      website: object.website
    };
  }

  findPlaces(location:Location, radius: number = 1000, types: string[] = ['bar', 'restaurant', 'cafe']):Observable<any> {
    console.log("Finding places...");
    let locationParameter = location.lat.toFixed(4) + "," + location.lng.toFixed(4);
    let typesParameter: string = types.length == 0 ? "bar|restaurant|cafe" : types.reduce((a, b) => a + "|" + b);

    let params: URLSearchParams = new URLSearchParams();
    params.set('key', KEY);
    params.set('location', locationParameter);
    params.set('types', typesParameter);
    params.set('radius', radius.toString());

    return this.http
      .get(PLACES_URL, { search: params })
      .map(response => response.json())
      .map(object => object.results)
      .map(array => array.map(entry => this.mapPlace(entry)))
      .map(array => {
        let result = {
          location: location,
          results: array
        }
        return result;
      });
  }
  

  /**
   * Maps the data structure of a place returned from the Google Places API to our internal model.
   */
  private mapPlace(o:any):Place {
    let place:Place = {
      type: o.types.filter(t => t === 'bar' || t === 'restaurant' || t === 'cafe')[0],
      name: o.name,
      location: {
        lng: o.geometry.location.lng,
        lat: o.geometry.location.lat,
      },
      id: o.place_id
    }
    return place;
  }

}

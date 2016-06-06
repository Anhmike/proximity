System.registerDynamic("app/environment.js",[],!0,function(a,b,c){"use strict";return b.environment={production:!0},c.exports}),System.registerDynamic("app/search/search.component.js",["@angular/core","@angular/common","../places.service"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("@angular/common"),h=a("../places.service"),i=function(){function a(a){this.placesService=a,this.searchResults=new f.EventEmitter,this.search=new g.Control,this.searchingLocation=!1,this.searchingPlaces=!1}return a.prototype.ngOnInit=function(){},a.prototype.searchCurrentLocation=function(){var a=this;console.log("search current location"),navigator.geolocation?(this.searchingLocation=!0,navigator.geolocation.getCurrentPosition(function(b){var c={lat:b.coords.latitude,lng:b.coords.longitude};a.searchingLocation=!1,a.performPlaceSearch(c)})):alert("Geolocation is not supported by this browser.")},a.prototype.searchCity=function(){var a=this;console.log("search city "+this.search.value),this.searchingPlaces=!0,this.placesService.getLocation(this.search.value).subscribe(function(b){return a.performPlaceSearch(b)})},a.prototype.searchKeyPressed=function(a){console.log(a),13==a.keyCode&&this.searchCity()},a.prototype.performPlaceSearch=function(a){var b=this;console.log("Searching for places in location "+a.lng+"/"+a.lat),this.searchingPlaces=!0,this.placesService.findPlaces(a).subscribe(function(a){b.searchingPlaces=!1,b.searchResults.emit(a)},function(a){b.searchingPlaces=!1,console.error("ERROR: "),console.error(JSON.stringify(a))})},d([f.Output(),e("design:type",Object)],a.prototype,"searchResults",void 0),a=d([f.Component({moduleId:c.id,selector:"app-search",templateUrl:"search.component.html"}),e("design:paramtypes",[h.PlacesService])],a)}();return b.SearchComponent=i,c.exports}),System.registerDynamic("app/places.service.js",["@angular/core","@angular/http","rxjs/add/operator/map"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("@angular/http");a("rxjs/add/operator/map");var h="AIzaSyD90zqxTa46SdMqSeM529xHF5Ye9DBkyTM",i="https://maps.googleapis.com/maps/api/geocode/json",j="https://cors-anywhere.herokuapp.com/",k=j+"https://maps.googleapis.com/maps/api/place/nearbysearch/json",l=j+"https://maps.googleapis.com/maps/api/place/details/json",m=function(){function a(a){this.http=a}return a.prototype.getLocation=function(a){console.log("Geocoding address "+a);var b=new g.URLSearchParams;return b.set("address",a),this.http.get(i,{search:b}).map(function(a){return a.json()}).map(function(a){return a.results[0].geometry.location})},a.prototype.getDetails=function(a){var b=this;console.log("Finding details for place "+a.name);var c=new g.URLSearchParams;return c.set("placeid",a.id),c.set("key",h),this.http.get(l,{search:c}).map(function(a){return a.json()}).map(function(a){return a.result}).map(function(a){return b.mapPlaceDetails(a)})},a.prototype.mapPlaceDetails=function(a){return{address:a.formatted_address,phone:a.international_phone_number,openingHours:a.openingHours?a.openingHours.weekdayText:[],rating:a.rating,website:a.website}},a.prototype.findPlaces=function(a,b,c){var d=this;void 0===b&&(b=1e3),void 0===c&&(c=["bar","restaurant","cafe"]),console.log("Finding places...");var e=a.lat.toFixed(4)+","+a.lng.toFixed(4),f=0==c.length?"bar|restaurant|cafe":c.reduce(function(a,b){return a+"|"+b}),i=new g.URLSearchParams;return i.set("key",h),i.set("location",e),i.set("types",f),i.set("radius",b.toString()),this.http.get(k,{search:i}).map(function(a){return a.json()}).map(function(a){return a.results}).map(function(a){return a.map(function(a){return d.mapPlace(a)})}).map(function(b){var c={location:a,results:b};return c})},a.prototype.mapPlace=function(a){var b={type:a.types.filter(function(a){return"bar"===a||"restaurant"===a||"cafe"===a})[0],name:a.name,location:{lng:a.geometry.location.lng,lat:a.geometry.location.lat},id:a.place_id};return b},a=d([f.Injectable(),e("design:paramtypes",[g.Http])],a)}();return b.PlacesService=m,c.exports}),System.registerDynamic("app/place-details/place-details.component.js",["@angular/core","../places.service"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("../places.service"),h=function(){function a(a){this.placesService=a}return a.prototype.ngOnChanges=function(){var a=this;console.log("Changes: "+this.place),null!=this.place?this.placesService.getDetails(this.place).subscribe(function(b){return a.details=b}):this.details=null},d([f.Input(),e("design:type",Object)],a.prototype,"place",void 0),a=d([f.Component({moduleId:c.id,selector:"app-place-details",templateUrl:"place-details.component.html"}),e("design:paramtypes",[g.PlacesService])],a)}();return b.PlaceDetailsComponent=h,c.exports}),System.registerDynamic("app/places-list/places-list.component.js",["@angular/core","../place-details/place-details.component","../user.service"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("../place-details/place-details.component"),h=a("../user.service"),i=function(){function a(a){this.userService=a}return a.prototype.ngOnInit=function(){var a=this;this.userService.user.subscribe(function(b){a.user=b,a.ngOnChanges()})},a.prototype.ngOnChanges=function(){var a=this;if(null!=this.places){this.attending=new Array(this.places.length);for(var b=function(b){c.userService.getAttending(c.user,c.places[b]).subscribe(function(c){return a.attending[b]=null!=c})},c=this,d=0;d<this.places.length;d++)b(d)}},a.prototype.getLabel=function(a){return String.fromCharCode(65+a)},a.prototype.selectPlace=function(a){this.selected=a},a.prototype.attend=function(a){console.log("user "+this.user+" attending place "+a.name),this.userService.attend(this.user,a)},a.prototype.leave=function(a){console.log("user "+this.user+" leaving place "+a.name),this.userService.leave(this.user,a)},a.prototype.isAttending=function(a){return this.attending[a]},d([f.Input(),e("design:type",Array)],a.prototype,"places",void 0),d([f.Input(),e("design:type",Object)],a.prototype,"selected",void 0),a=d([f.Component({moduleId:c.id,selector:"app-places-list",templateUrl:"places-list.component.html",directives:[g.PlaceDetailsComponent]}),e("design:paramtypes",[h.UserService])],a)}();return b.PlacesListComponent=i,c.exports}),System.registerDynamic("app/user.service.js",["@angular/core","angularfire2"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("angularfire2"),h=function(){function a(a){this.af=a,this.user=this.af.auth.map(function(a){return null==a?null:a.twitter.username})}return a.prototype.login=function(){this.af.auth.login()},a.prototype.logout=function(){this.af.auth.logout()},a.prototype.attend=function(a,b){this.getAttending(a,b).set(!0)},a.prototype.leave=function(a,b){this.getAttending(a,b).remove()},a.prototype.getAttending=function(a,b){return this.af.object("/"+b.id+"/"+a)},a=d([f.Injectable(),e("design:paramtypes",[g.AngularFire])],a)}();return b.UserService=h,c.exports}),System.registerDynamic("app/proximity.component.js",["@angular/core","./places.service","angular2-google-maps/core","./search/search.component","./places-list/places-list.component","./user.service"],!0,function(a,b,c){"use strict";var d=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=3>f?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(3>f?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},e=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},f=a("@angular/core"),g=a("./places.service"),h=a("angular2-google-maps/core"),i=a("./search/search.component"),j=a("./places-list/places-list.component"),k=a("./user.service"),l=function(){function a(a,b){this.placesService=a,this.userService=b,this.places=[],this.lat=51.678418,this.lng=7.809007}return a.prototype.ngOnInit=function(){var a=this;this.userService.user.subscribe(function(b){return a.user=b})},a.prototype.clickMarker=function(a){this.selectedPlace=a},a.prototype.handleSearchResult=function(a){var b=a.location,c=a.results;this.places=c,this.lat=b.lat,this.lng=b.lng,this.selectedPlace=null},a.prototype.getLabel=function(a){return String.fromCharCode(65+a)},a=d([f.Component({moduleId:c.id,selector:"proximity-app",templateUrl:"proximity.component.html",providers:[g.PlacesService,k.UserService],directives:[i.SearchComponent,j.PlacesListComponent,h.ANGULAR2_GOOGLE_MAPS_DIRECTIVES],styleUrls:["proximity.component.css"]}),e("design:paramtypes",[g.PlacesService,k.UserService])],a)}();return b.ProximityAppComponent=l,c.exports}),System.registerDynamic("app/index.js",["./environment","./proximity.component"],!0,function(a,b,c){"use strict";var d=a("./environment");b.environment=d.environment;var e=a("./proximity.component");return b.ProximityAppComponent=e.ProximityAppComponent,c.exports});
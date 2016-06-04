import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ProximityAppComponent, environment } from './app/';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

if (environment.production) {
  enableProdMode();
}

bootstrap(ProximityAppComponent, [ANGULAR2_GOOGLE_MAPS_PROVIDERS]);

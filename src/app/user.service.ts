import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { Place } from './place';

@Injectable()
export class UserService {

  public user:Observable<string>;
  
  constructor(private af:AngularFire) {
    this.user = this.af.auth.map(auth => auth == null ? null : auth.twitter.username);
  }

  login() {
    this.af.auth.login();
  }
  
  logout() {
    this.af.auth.logout();
  }
  

  // enter/leave a bar
  
  attend(user:string, place:Place) {
    this.getAttending(user, place).set(true);
  }
  
  leave(user:string, place:Place) {
    this.getAttending(user, place).remove();
  }  
  
  getAttending(user:string, place:Place) {
    return this.af.object('/' + place.id + '/' + user);
  }

}

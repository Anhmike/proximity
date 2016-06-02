import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ProximityAppComponent } from '../app/proximity.component';

beforeEachProviders(() => [ProximityAppComponent]);

describe('App: Proximity', () => {
  it('should create the app',
      inject([ProximityAppComponent], (app: ProximityAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'proximity works!\'',
      inject([ProximityAppComponent], (app: ProximityAppComponent) => {
    expect(app.title).toEqual('proximity works!');
  }));
});

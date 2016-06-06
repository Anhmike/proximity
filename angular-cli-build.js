/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.+(js|ts|js.map)',
      '@angular/**/*.+(js|ts|js.map)',
      'angular2-google-maps/**/*.+(js|ts|js.map)',
      'angularfire2/**/*.+(js|ts|js.map)',
      'firebase/lib/*.+(js|ts|js.map)'
    ]
  });
};

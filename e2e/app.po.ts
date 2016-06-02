export class ProximityPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('proximity-app h1')).getText();
  }
}

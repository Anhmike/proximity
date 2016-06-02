import { ProximityPage } from './app.po';

describe('proximity App', function() {
  let page: ProximityPage;

  beforeEach(() => {
    page = new ProximityPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('proximity works!');
  });
});

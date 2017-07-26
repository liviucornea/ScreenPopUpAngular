import { ScreenPopAngularPage } from './app.po';

describe('screen-pop-angular App', () => {
  let page: ScreenPopAngularPage;

  beforeEach(() => {
    page = new ScreenPopAngularPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

import { FirebaseCmsPage } from './app.po';

describe('firebase-cms App', () => {
  let page: FirebaseCmsPage;

  beforeEach(() => {
    page = new FirebaseCmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

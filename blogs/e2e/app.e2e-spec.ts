import { BlogsPage } from './app.po';

describe('blogs App', () => {
  let page: BlogsPage;

  beforeEach(() => {
    page = new BlogsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

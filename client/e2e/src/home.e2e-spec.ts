import { HomePage } from "./home.po";
import { browser, protractor } from 'protractor';


describe('The home page:', () => {
  let page: HomePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('Should click the add note button and navigate to the correct page', async () => {
    let url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(false);

    await page.clickAddNewNote();

    await browser.wait(EC.urlContains('/new'), 10000);

    url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(true);
  });

});

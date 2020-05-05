import {AppPage} from './app.po';
import { E2EUtil } from './e2e.util';
import { browser } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeAll(async () => {
    await E2EUtil.login();
    browser.sleep(5000);
  });

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should load', () => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('DoorBoard');
  });
});

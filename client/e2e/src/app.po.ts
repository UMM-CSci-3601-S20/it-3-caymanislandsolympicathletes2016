import {browser, element, by} from 'protractor';

export class AppPage {
  navigateTo() {
    browser.get('/');
    browser.sleep(7000)
  }

  getAppTitle() {
    return element(by.className('app-title')).getText();
  }
}

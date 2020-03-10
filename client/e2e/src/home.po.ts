import { browser, element, by } from 'protractor';

export class HomePage {

  navigateTo() {
    return browser.get('/');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  clickAddNewNote() {
    return element(by.className('add-note-fab')).click();
  }
}

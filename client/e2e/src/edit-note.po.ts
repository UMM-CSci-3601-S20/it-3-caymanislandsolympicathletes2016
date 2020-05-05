import { browser, element, by } from 'protractor';
import { OwnerPage } from './owner.po';

export class EditNotePage {

  navigateTo() {
    const ownerPage = new OwnerPage();
    ownerPage.navigateTo();
    ownerPage.editFirstNote();
  }

  getTitle() {
    const title = element(by.className('edit-note-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  clickEditNote() {
    return element(by.id('confirmEditNoteButton')).click();
  }

  clickCancelNote() {
    return element(by.id('cancelEditNoteButton')).click();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }
}

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

  async getNumberOfNotes(): Promise<number> {
    return await element.all(by.className('note-card')).count();
  }

  async deleteAllNotes() {
    while (await this.getNumberOfNotes() !== 0) {
      this.deleteFirstNote();
    }
  }

  deleteFirstNote() {
    element.all(by.buttonText('delete')).get(0).click();
  }
}

import { browser, element, by } from 'protractor';

export class TrashPage {

  navigateTo() {
    browser.get('/trash');
    browser.sleep(5000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  async getNumberOfNotes(): Promise<number> {
    return await element.all(by.className('note-card')).count();
  }

  restoreFirstNote() {
    element.all(by.className('restore-note-button')).get(0).click();
    browser.sleep(3000);
  }

  deleteFirstNote() {
    element.all(by.className('delete-note-button')).get(0).click();
    browser.sleep(3000);
  }

  async deleteAllNotes() {
    while (await this.getNumberOfNotes() !== 0) {
      this.deleteFirstNote();
      browser.sleep(3000);
    }
  }
}

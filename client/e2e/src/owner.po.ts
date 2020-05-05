import { browser, element, by } from 'protractor';

export class OwnerPage {

  navigateTo() {
    browser.get('/');
    browser.sleep(7000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  clickAddNewNote() {
    return element(by.className('add-note-fab')).click();
  }

  clickTrashPage() {
    return element(by.className('trash-fab')).click();
  }

  addNewNote(body: string) {
    element(by.className('add-note-fab')).click();
  }

  async getNumberOfNotes(): Promise<number> {
    return await element.all(by.className('note-card')).count();
  }

  async getPinnedNotes() {
    return await element.all(by.className('pinned-note-card')).count();
  }

  async getUnpinnedNotes() {
    return await element.all(by.className('unpinned-note-card')).count();
  }

  async deleteAllNotes() {
    while (await this.getNumberOfNotes() !== 0) {
      this.deleteFirstNote();
      browser.sleep(3000);
    }
  }

  deleteFirstNote() {
    element.all(by.className('delete-note-button')).get(0).click();
  }

  editFirstNote() {
    // The button's text says 'create' because that's the name of
    // the material pencil icon. It's not actually a button for
    // creating things.
    element.all(by.buttonText('create')).get(0).click();
    browser.sleep(3000);
  }

  async pinFirstNote() {
    await element.all(by.buttonText('star_border')).get(0).click();
  }

  async unpinFirstNote() {
    await element.all(by.buttonText('star')).get(0).click();
  }
}

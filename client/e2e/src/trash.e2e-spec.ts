import { E2EUtil } from "./e2e.util";
import { TrashPage } from './trash.po';
import { protractor } from 'protractor/built/ptor';
import { browser } from 'protractor';

describe('The Trash Page: ', () => {
  let page: TrashPage;
  const EC = protractor.ExpectedConditions;

  beforeAll(async () => {
    await E2EUtil.login();
    browser.sleep(3000);

    await E2EUtil.deleteAllNotes();
  });

  beforeEach(() => {
    page = new TrashPage();
    page.navigateTo();
  });

  describe('The restore note button: ', () => {

    it('should restore the note', async () => {
      const initialNotes = await page.getNumberOfNotes();

      await page.restoreFirstNote();
      browser.sleep(3000);

      expect(page.getNumberOfNotes()).toBe(initialNotes - 1);
    });
  });

  describe('The permanent delete note button: ', () => {

    it('should permanently delete the note', async () => {
      const initialNotes = await page.getNumberOfNotes();

      await page.deleteFirstNote();
      browser.sleep(3000);

      expect(page.getNumberOfNotes()).toBe(initialNotes - 1);
    });

    it('should permanently delete all notes when we click all the buttons', async () => {
      expect(await page.getNumberOfNotes()).not.toBe(0);
      await page.deleteAllNotes();
      expect(await page.getNumberOfNotes()).toBe(0);
    });

    it('should be persistent', async () => {
      // Since we've already run the previous two tests, all the notes should
      // be deleted now, even after we re-navigate to the page.
      expect(await page.getNumberOfNotes()).toBe(0);
    });
  });
});

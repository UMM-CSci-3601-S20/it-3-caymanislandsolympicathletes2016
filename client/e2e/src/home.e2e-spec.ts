import { HomePage } from './home.po';
import { browser, protractor } from 'protractor';
import { E2EUtil } from './e2e.util';


describe('The home page:', () => {
  let page: HomePage;
  const EC = protractor.ExpectedConditions;

  beforeAll(async () => {
    await E2EUtil.login();
  });

  beforeEach(async () => {
    page = new HomePage();
    page.navigateTo();
  });

  it('Should click the add note button and navigate to the correct page', async () => {
    let url = await page.getUrl();
    expect(url.endsWith('/')).toBe(true);

    await page.clickAddNewNote();

    await browser.wait(EC.urlContains('/new'), 10000);

    url = await page.getUrl();
    expect(url.endsWith('/new')).toBe(true);
  });

  it('Should click the trash page button and navigate to the correct page', async () => {
    let url = await page.getUrl();
    expect(url.endsWith('/')).toBe(true);

    await page.clickTrashPage();

    await browser.wait(EC.urlContains('/trash'), 10000);

    url = await page.getUrl();
    expect(url.endsWith('/trash')).toBe(true);

    browser.sleep(3000);
  });

  describe('The delete button:', () => {
    // Note: these tests depend on there being at least 2 notes seeded in the
    // database.
    // Also, the order in which these tests run matters.

    beforeAll(async () => {
      console.log('Adding first note');
      let body = E2EUtil.randomText(8);
      await E2EUtil.addNewNote(body);
      browser.sleep(3000);
      console.log('Adding second note');
      body = E2EUtil.randomText(9);
      await E2EUtil.addNewNote(body);
      browser.sleep(3000);
    });

    it('should delete exactly one note when clicked', async () => {
      const initialNumberOfNotes = await page.getNumberOfNotes();
      console.log('Initial Notes: ' + initialNumberOfNotes);
      page.deleteFirstNote();
      browser.sleep(3000);
      expect(await page.getNumberOfNotes()).toBe(initialNumberOfNotes - 1);
    });

    it('should delete all notes when we click all the buttons', async () => {
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

  describe('The edit button:', () => {
    beforeEach(async () => {
      await page.deleteAllNotes();
      await E2EUtil.addNewNote('foo');
      browser.sleep(3000);
    });

    it('navigates to the correct page', async () => {
      let url = await page.getUrl();
      expect(url.includes('/edit')).toBe(false);

      page.editFirstNote();

      await browser.wait(EC.urlContains('/edit'), 10000);

      url = await page.getUrl();
      expect(url.includes('/edit')).toBe(true);
    });
  });

  describe('The pin note button: ', () => {
    beforeAll(async () => {
      let body = E2EUtil.randomText(8);
      await E2EUtil.addNewNote(body);
      browser.sleep(3000);
    });

    it('pins and unpins the note', async () => {
      const initialUnpinned = await page.getUnpinnedNotes();
      const initialPinned = await page.getPinnedNotes();

      await page.pinFirstNote();
      browser.sleep(3000);

      expect(page.getUnpinnedNotes()).toBe(initialUnpinned - 1);
      expect(page.getPinnedNotes()).toBe(initialPinned + 1);

      await page.unpinFirstNote();
      browser.sleep(3000);

      expect(page.getUnpinnedNotes()).toBe(initialUnpinned);
      expect(page.getPinnedNotes()).toBe(initialPinned);
    });
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OwnerComponent} from './owner.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MockNoteService } from 'src/testing/note.service.mock';
import { MockOwnerService } from 'src/testing/owner.service.mock';
import { NotesService } from '../notes.service';
import { AuthService } from '../authentication/auth.service';
import { Note } from '../note';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('Component: Owner page:', () => {

  let component: OwnerComponent;
  let fixture: ComponentFixture<OwnerComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockNoteService: MockNoteService;
  let mockOwnerService: MockOwnerService;
  let spyedAuthService: AuthService;
  let spy: any;
  let router: Router;


  beforeEach(() => {
    mockNoteService = new MockNoteService();
    mockOwnerService = new MockOwnerService();
    spyedAuthService = new AuthService(router);

    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [OwnerComponent], // declare the test component
      providers: [{provide: NotesService, useValue: mockNoteService}],
    });

    fixture = TestBed.createComponent(OwnerComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the link (<a> tag) by CSS element selector
    de = fixture.debugElement.query(By.css('#generate-pdf-button'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The retrieveOwner() method:', () => {
    it('gets the owner Kyle Fluto', () => {

    });

    it('gets the owner Rachel Johnson', () => {

    });

    it('gets the owner Joe Beaver', () => {

    });

    it('gets the owner James Flegel', () => {

    });

    it('does not get the owner Jack Black', () => {

    });
  });

  describe('The retrieveNotes() method:', () => {
    it('gets all the notes from the server', () => {
      component.retrieveNotes();

      expect(component.notes.length).toBe(3);
    });

    it('contains a note with body \'This is the first note\'', () => {
      component.retrieveNotes();

      expect(component.notes.some((note: Note) => note.body === 'This is the first note')).toBe(true);
    });
  });

  describe('The deleteNote() method:', () => {
    it('calls notesService.deleteNote', () => {
      const id = 'Hey everyone, I\'m an ID!';
      spyOn(MockNoteService.prototype, 'deleteNote').and.returnValue(of(true));

      component.deleteNote(id);
      expect(MockNoteService.prototype.deleteNote).toHaveBeenCalledWith(id);
    });
  });

  /*
  describe('The savePDF() method:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      component.savePDF();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });

  describe('The GENERATE PDF button:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      el.click();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });
  */

});

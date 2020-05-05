import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {OwnerComponent} from './owner.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MockNoteService } from 'src/testing/note.service.mock';
import { MockOwnerService } from 'src/testing/owner.service.mock';
import { NotesService } from '../notes.service';
import { AuthService } from '../authentication/auth.service';
import { OwnerService } from '../owner.service';
import { Note } from '../note';
import { of } from 'rxjs';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Owner } from '../owner';



describe('OwnerPageComponent: using Rachel Johnson data from MockOwnerService for valid requests', () => {
  let component: OwnerComponent;
  let fixture: ComponentFixture<OwnerComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockNoteService: MockNoteService;
  let mockOwnerService: MockOwnerService;
  let authService: AuthService;
  let spy: any;

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let expectedOwner: Owner;

  beforeEach(async(() => {
    mockNoteService = new MockNoteService();
    mockOwnerService = new MockOwnerService();
    TestBed.configureTestingModule({
      imports: [MatCardModule, RouterTestingModule, MatSnackBar, MatSnackBarModule],
      declarations: [OwnerComponent], // declare the test component
      providers: [
          {provide: NotesService, useValue: mockNoteService},
          {provide: OwnerService, useValue: mockOwnerService},
          {provide: ActivatedRoute, useValue: activatedRoute},
          {provide: AuthService, useValue: authService}]
      }).compileComponents();
    }));

  beforeEach(() => {

    expectedOwner = MockOwnerService.testOwners[0];
    activatedRoute.setParamMap({ x500: expectedOwner.x500 });

    // initialize the testing component
    fixture = TestBed.createComponent(OwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#generate-pdf-button'));
    el = de.nativeElement;
  });

  it('should create the testing component', () => {
    expect(component).toBeTruthy();
    expect(component.owner._id).toEqual(expectedOwner._id);
    expect(component.owner).toEqual(expectedOwner);
  });

  describe('The retrieveOwner() method:', () => {
    it('gets the owner Kyle Fluto', () => {
      const spyOnX500 = spyOnProperty(component, 'x500').and.returnValue('fluto006');
      mockOwnerService.retrieveOwner();
      expect(spyOnX500).toHaveBeenCalled();
      expect(mockOwnerService.retrieveOwner).toHaveBeenCalled();
      expect(component.x500).toBe('fluto006');
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

  describe('The savePDF() method:', () => {
    it('OwnerComponent gets a pdf document from OwnerService via a call to getPDF()', () => {
      component.savePDF();
      expect(component.savePDF).toHaveBeenCalled();
      expect(mockOwnerService.getPDF).toHaveBeenCalled();
    });
  });

  describe('The GENERATE PDF button:', () => {
    it('Generates a pdf document from OwnerService via a call to getPDF() by clicking the GENERATE PDF button', () => {
      el.click();
      expect(component.savePDF).toHaveBeenCalled();
      expect(mockOwnerService.getPDF).toHaveBeenCalled();
    });
  });

});

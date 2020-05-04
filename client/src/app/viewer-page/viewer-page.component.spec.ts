import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageComponent } from './viewer-page.component';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';
import { OwnerService } from '../owner.service';
import { MockOwnerService } from 'src/testing/owner.service.mock';
import { Note } from '../note';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewerPageComponent:', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;
  let mockNoteService: MockNoteService;
  let mockOwnerService: MockOwnerService;

  beforeEach(() => {
    mockNoteService = new MockNoteService();
    mockOwnerService = new MockOwnerService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ViewerPageComponent ],
      providers: [{provide: NotesService, useValue: mockNoteService},
      {provide: OwnerService, useValue: mockOwnerService}]
    });

    fixture = TestBed.createComponent(ViewerPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The retrieveNotes() method:', () => {

    it('gets all the notes from the server', () => {
      component.retrieveNotes();
      expect(component.notes.length).toBe(3);
    });

    it('contains a note with body \'This is the first "posted" note\'', () => {
      component.retrieveNotes();
      expect(component.notes.some((note: Note) => note.body === 'This is the first "posted" note')).toBe(true);
    });

    it('notes are posted', () => {
      component.retrieveNotes();
      expect(component.notes.forEach((note: Note) => note.posted === true));
    });

  });
});

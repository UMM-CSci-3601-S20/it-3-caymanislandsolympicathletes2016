import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageComponent } from './viewer-page.component';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';
import { Note } from '../note';

describe('ViewerPageComponent:', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;
  let mockNoteService: MockNoteService;

  beforeEach(() => {
    mockNoteService = new MockNoteService();

    TestBed.configureTestingModule({
      declarations: [ ViewerPageComponent ],
      providers: [{provide: NotesService, useValue: mockNoteService}]
    });

    fixture = TestBed.createComponent(ViewerPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The retrieveNotes() method:', () => {

    it('gets all the notes from the server', () =>{
      component.retrieveNotes();

      expect(component.notes.length).toBe(3);
    });

    it('contains a note with body \'This is the first note\'', () => {
      component.retrieveNotes();

      expect(component.notes.some((note: Note) => note.body === 'This is the first note')).toBe(true);
    });

  });
});

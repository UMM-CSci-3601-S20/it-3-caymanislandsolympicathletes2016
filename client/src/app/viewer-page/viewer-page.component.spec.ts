import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageComponent } from './viewer-page.component';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';

describe('ViewerPageComponent:', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;
  let mockNotesService: MockNoteService;

  beforeEach(() => {
    mockNotesService = new MockNoteService();

    TestBed.configureTestingModule({
      declarations: [ ViewerPageComponent ],
      providers: [{provide: NotesService, useValue: mockNotesService}]
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
  });
});

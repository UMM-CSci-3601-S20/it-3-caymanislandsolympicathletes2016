import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageComponent } from './viewer-page.component';
import { MockNoteService } from 'src/testing/note.service.mock';
import { NotesService } from '../notes.service';
import { OwnerService } from '../owner.service';
import { MockOwnerService } from 'src/testing/owner.service.mock';
import { Note } from '../note';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Owner } from '../owner';
import { Observable } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';

fdescribe('ViewerPageComponent: using Rachel Johnson data from MockOwnerService for valid requests', () => {
  let component: ViewerPageComponent;
  let fixture: ComponentFixture<ViewerPageComponent>;
  let mockNoteService: MockNoteService;
  let mockOwnerService: MockOwnerService;

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let expectedOwner: Owner;

  beforeEach(async(() => {
    mockNoteService = new MockNoteService();
    mockOwnerService = new MockOwnerService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ViewerPageComponent ],
      providers: [{provide: NotesService, useValue: mockNoteService},
        {provide: OwnerService, useValue: mockOwnerService},
        { provide: ActivatedRoute, useValue: activatedRoute }]
      }).compileComponents();
  }));

  beforeEach(() => {

    expectedOwner = MockOwnerService.testOwners[0];  // owner Rachel Johnson from mock owners
    activatedRoute.setParamMap({ x500: expectedOwner.x500 });  // subscribe to Rachel Johnson and initialize the component with her stuff

    // initialize the testing component
    fixture = TestBed.createComponent(ViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.owner._id).toEqual(expectedOwner._id);
    expect(component.owner).toEqual(expectedOwner);
  });

  describe('The retrieveNotes() method:', () => {

    it('gets all of Rachel\'s "posted" notes from the server', () => {
      expect(component.notes.length).toBe(2);
    });

    it('gets all of Rachel\'s "pinned" notes from the server', () => {
      expect(component.notes.some((note: Note) => note.pinned === true));
    });

    it('contains a note with body \'This is the first "posted" note\'', () => {
      expect(component.notes.some((note: Note) => note.body === 'This is the first "posted" note')).toBe(true);
    });

    it('contains a note with body \'This is the first "pinned" note\'', () => {
      expect(component.notes.some((note: Note) => note.body === 'This is the first "pinned" note')).toBe(true);
    });

    it('notes are posted', () => {
      component.retrieveNotes();
      expect(component.notes.forEach((note: Note) => note.posted === true));
    });
  });
});

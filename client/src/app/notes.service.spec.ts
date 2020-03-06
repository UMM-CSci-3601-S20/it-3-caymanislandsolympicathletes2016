import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Note } from './note';
import { NotesService } from './notes.service';

describe('Note service:', () => {

  const testNotes: Note[] = [
    {
      _id: 'first_id',
      body: 'This is the first note'
    },
    {
      _id: 'second_id',
      body: 'This is the second note'
    },
    {
      _id: 'third_id',
      body: 'This is the third note'
    },
  ];
  let noteService: NotesService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    noteService = new NotesService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('The getNotes() method:', () => {
    it('calls api/notes', () => {
      noteService.getNotes().subscribe(
        notes => expect(notes).toBe(testNotes)
      );

      const req = httpTestingController.expectOne(noteService.noteUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testNotes);
    });
  });
});

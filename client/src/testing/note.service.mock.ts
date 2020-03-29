import { Injectable } from '@angular/core';
import { NotesService } from '../app/notes.service';
import { Note } from '../app/note';
import { of } from 'rxjs';

@Injectable()
export class MockNoteService extends NotesService {

  static testNotes: Note[] = [
    {
      _id: 'first_id',
      owner_id: 'rachel_id',
      body: 'This is the first note'
    },
    {
      _id: 'second_id',
      owner_id: 'joe_id',
      body: 'This is the second note'
    },
    {
      _id: 'third_id',
      owner_id: 'james_id',
      body: 'This is the third note'
    },
  ];

  public static FAKE_BODY = 'This is definitely the note you wanted';

  constructor() {
    super(null);
  }

  getNotes() {
    return of(MockNoteService.testNotes);
  }

  deleteNote(id: string) {
    return of(true);
  }

  addNote(note) {
    return of('I just put your note in the database and this is its new ID');
  }

  editNote(note: Note, id: string) {
    return of(id);
  }
/*
  getNoteById(id: string) {
    return of({
      _id: id,
      owner: 'rachel_id',
      body: MockNoteService.FAKE_BODY,
    });
  } */
}

import { Injectable } from '@angular/core';
import { NotesService } from '../app/notes.service';
import { Note } from '../app/note';
import { of } from 'rxjs';

@Injectable()
export class MockNoteService extends NotesService {

  static testNotes: Note[] = [
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
    }
  ]

  constructor() {
    super(null);
  }

  getNotes() {
    return of(MockNoteService.testNotes);
  }

  deleteNote(id: string) {
    return of(true);
  }
}

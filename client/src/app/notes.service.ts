import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Note } from './note';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class NotesService {

  readonly noteUrl: string = environment.API_URL + 'notes';

  constructor(private httpClient: HttpClient) {}

  getNotes() {
    return this.httpClient.get<Note[]>(this.noteUrl);
  }

  /**
   * Delete a note by ID from the database.
   *
   * @return true if the note was deleted, and false if the note wasn't
   *   deleted (eg, if the ID you gave didn't correspond to a note in the
   *   database.)
   *
   * Usually, you can just ignore the return value.
   */
  deleteNote(id: string): Observable<boolean> {
    type DeleteResponse = 'deleted' | 'nothing deleted';

    const response =
      this.httpClient.delete<DeleteResponse>(this.noteUrl + '/' + encodeURI(id));

    return response.pipe(map(theResponse => theResponse === 'deleted'));
  }
}

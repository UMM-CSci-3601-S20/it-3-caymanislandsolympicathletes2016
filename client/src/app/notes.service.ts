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

  constructor(private httpClient: HttpClient) { }

  getNotes() {
    return this.httpClient.get<Note[]>(this.noteUrl);
  }

  addNote(newNote: Note): Observable<string> {
    return this.httpClient.post<{id: string}>(this.noteUrl + '/new', newNote).pipe(map(res => res.id));
  }
}

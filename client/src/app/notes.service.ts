import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  addNote(newNote: Note): Observable<string> {
    return this.httpClient.post<{id: string}>(this.noteUrl + '/new', newNote).pipe(map(res => res.id));
  }

  editNote(editNote: Note, id: string): Observable<string> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('_id', id);
    httpParams = httpParams.set('body', editNote.body);
    return this.httpClient.post<{id: string}>(this.noteUrl + '/edit', {params: httpParams}).pipe(map(res => res.id));
  }

  getNoteById(id: string): Observable<Note> {
    return this.httpClient.get<Note>(this.noteUrl + '/' + id);
  }

}

import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})
export class ViewerPageComponent implements OnInit {

  public notes: Note[];
  getNotesSub: Subscription;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
  }

  retrieveNotes(): void {
    this.getNotesSub = this.notesService.getNotes().subscribe(returnedNotes =>{
      this.notes = returnedNotes;
    }, err => {
      console.log(err);
    });
  }
}

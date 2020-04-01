import {Component} from '@angular/core';
import {PDFService} from '../pdf.service';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-component',
  templateUrl: 'owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent {

  public notes: Note[];
  getNotesSub: Subscription;

  constructor(private pdfService: PDFService, private ownerService: OwnerService, private notesService: NotesService) {}

  owner: Owner;

  retrieveNotes(): void {
    this.unsub();
    this.getNotesSub = this.notesService.getOwnerNotes().subscribe(returnedNotes => {
      this.notes = returnedNotes;
    }, err => {
      console.log(err);
    });
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe(result => {
      // Ignore the result for now.
      this.retrieveNotes();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.retrieveNotes();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }

  savePDF(): void {
    this.pdfService.getPDF().save('DoorBoard');
  }
}

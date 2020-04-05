import { Component, OnInit, OnDestroy} from '@angular/core';
import {PDFService} from '../pdf.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
// This class has access to the owner of the doorboard, and all the posts that said owner has made
export class OwnerComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private auth: AuthService,
              private _location: Location, private pdfService: PDFService, private notesService: NotesService,
              private ownerService: OwnerService) {
                console.log("Constructing Owner Component");
              }
  notes: Note[];
  owner: Owner;
  id: string;
  name: string;
  getNotesSub: Subscription;
  getOwnerSub: Subscription;
  getx500Sub: Subscription;
  x500: string;


  retrieveOwner(): void {
    this.getx500Sub = this.auth.userProfile$.subscribe(returned => {
      this.x500 = returned.nickname;
    });
    this.getOwnerSub = this.ownerService.getOwnerByx500(this.x500).subscribe(returnedOwner => {
      this.owner = returnedOwner;
      this.retrieveNotes();
    }, err => {
      console.log(err);
    });
  }

  retrieveNotes(): void {
    this.getNotesSub = this.notesService.getOwnerNotes({owner_id: this.owner._id}).subscribe(returnedNotes => {
      this.notes = returnedNotes.reverse();
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
    this.retrieveOwner();
  }

  /*
  ngOnInit() {
  this. = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.notesService.getOwnerNotes(params.get('owner_id')))
  );
} */

  ngOnDestroy(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
    if (this.getOwnerSub) {
      this.getOwnerSub.unsubscribe();
    }
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






/*
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
*/

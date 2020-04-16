import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import {Location} from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
// This class has access to the owner of the doorboard, and all the posts that said owner has made
export class OwnerComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, public auth: AuthService,
              private _location: Location, private notesService: NotesService,
              private ownerService: OwnerService, private snackBar: MatSnackBar) {
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
  logins: number;


  async retrieveNotes() {
    if (this.ownerService.owner == null) {
      let foundOwner = await this.ownerService.retrieveOwner();
    }
    this.owner = this.ownerService.owner;
    this.getNotesSub = this.notesService.getOwnerNotes({owner_id: this.owner._id, posted: true}).subscribe(returnedNotes => {
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
    this.retrieveNotes();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
    if (this.getOwnerSub) {
      this.getOwnerSub.unsubscribe();
    }
  }

  savePDF(): void {

    // get id of owner, and pass is as a parameter in getPDF
    this.ownerService.getPDF(this.owner.name, this.x500).save('DoorBoard');
  }
}

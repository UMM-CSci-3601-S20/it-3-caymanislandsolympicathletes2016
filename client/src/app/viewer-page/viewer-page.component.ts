import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { OwnerComponent } from '../owner/owner.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})

export class ViewerPageComponent implements OnInit {

  constructor(public auth: AuthService, private notesService: NotesService, private ownerService: OwnerService,
    private router: Router, private route: ActivatedRoute) {}

  notes: Note[];
  owner: Owner;
  id: string;
  name: string;
  getNotesSub: Subscription;
  getOwnerSub: Subscription;
  getx500Sub: Subscription;
  x500: string;
  logins: number;


  retrieveOwner(): void {
    this.getx500Sub = this.auth.userProfile$.subscribe(returned => {
      this.x500 = returned.nickname;
    });
    this.getOwnerSub = this.ownerService.getOwnerByx500(this.x500).subscribe(returnedOwner => {
      this.owner = returnedOwner;
      this.retrieveNotes();
    });
  }

  retrieveNotes(): void {
    this.getNotesSub = this.notesService.getOwnerNotes({owner_id: this.owner._id, posted: true}).subscribe(returnedNotes =>{
      this.notes = returnedNotes.reverse();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
      this.retrieveOwner();
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

}

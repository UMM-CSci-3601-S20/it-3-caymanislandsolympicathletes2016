import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { OwnerComponent } from '../owner/owner.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})

export class ViewerPageComponent implements OnInit {

  public notes: Note[];
  public urlId: string;
  getNotesSub: Subscription;
  getOwnerSub: Subscription;
  owner: Owner;

  constructor(private notesService: NotesService, private ownerService: OwnerService, private router: Router, private route: ActivatedRoute) {}

  //  retrieveUrlId(): void {
  //   this.route.paramMap.subscribe((pmap) => {
  //     this.urlId = pmap.get('id');
  //   });
  // }

  retrieveOwner(): void {
    this.getOwnerSub = this.ownerService.getOwnerById(this.urlId).subscribe(returnedOwner => {
      this.owner = returnedOwner;
    }, err => {
      console.log(err);
    });
  }

  retrieveNotes(): void {
    this.getNotesSub = this.notesService.getOwnerNotes({owner_id: this.urlId}).subscribe(returnedNotes =>{
      this.notes = returnedNotes.reverse();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.urlId = pmap.get('id');
      this.retrieveNotes();
    });
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

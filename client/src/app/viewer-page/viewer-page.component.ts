import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})

export class ViewerPageComponent implements OnInit {

  public notes: Note[];
  public urlId: string;
  public urlx500: string;
  getNotesSub: Subscription;
  getOwnerSub: Subscription;
  owner: Owner;
  public GcalURL: SafeResourceUrl;


  constructor(private notesService: NotesService, private ownerService: OwnerService,
              private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  //  retrieveUrlId(): void {
  //   this.route.paramMap.subscribe((pmap) => {
  //     this.urlId = pmap.get('id');
  //   });
  // }

  retrieveOwner(): void {
    this.getOwnerSub = this.ownerService.getOwnerByx500(this.urlx500).subscribe(returnedOwner => {
      this.owner = returnedOwner;
      this.retrieveNotes();
    }, err => {
      console.log(err);
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
    this.route.paramMap.subscribe((pmap) => {
      this.urlx500 = pmap.get('x500');
      this.retrieveOwner();
      this.createGmailConnection(this.owner.email);
    });

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

  public createGmailConnection(urlx500: string): void {
    let gmailUrl = urlx500.replace('@', '%40'); // Convert owner e-mail to acceptable format for connection to gCalendar
    console.log('BEING CALLED');
    gmailUrl = 'https://calendar.google.com/calendar/embed?src=' + gmailUrl; // Connection string
    //this.GcalURL = gmailUrl; // Set the global connection string
    this.GcalURL = this.sanitizer.bypassSecurityTrustResourceUrl(gmailUrl);
  }
}

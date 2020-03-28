import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from './owner';
import { OwnerService } from './owner.service';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})


// This class has access to the owner of the doorboard, and all the notes that said owner has made
export class OwnerComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private noteService: NotesService,
              private ownerService: OwnerService) { }
  notes: Note[];
  owner: Owner;
  id: string;
  getNotesSub: Subscription;
  getOwnerSub: Subscription;
  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested owner.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.getOwnerSub = this.ownerService.getOwnerById(this.id).subscribe(owner => this.owner = owner);
      this.getNotesSub = this.noteService.getNotes().subscribe(notes => this.notes = notes.reverse());

    });
  }

  ngOnDestroy(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
    if (this.getOwnerSub) {
      this.getOwnerSub.unsubscribe();
    }
  }

}

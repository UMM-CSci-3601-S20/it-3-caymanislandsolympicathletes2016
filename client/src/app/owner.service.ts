import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { Owner } from './owner';
import { map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import { AuthService } from './authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class OwnerService {
  // what the url will start with
  readonly ownerUrl: string = environment.API_URL + 'owner';

  owner: Owner;
  getx500Sub: Subscription;
  getOwnerSub: Subscription;
  ownerx500: string;

  constructor(private httpClient: HttpClient, private auth: AuthService, private snackBar: MatSnackBar) {
    console.log('Constructing Owner Service');
  }

  getOwnerById(id: string): Observable<Owner> {
    return this.httpClient.get<Owner>(this.ownerUrl + '/' + id);
  }

  getOwnerByx500(x500: string): Observable<Owner> {
    return this.httpClient.get<Owner>(this.ownerUrl + '/x500/' + x500);
  }

  getOwnerByName(name: string): Observable<Owner> {
    return this.httpClient.get<Owner>(this.ownerUrl + '/' + name);
  }

  // Adds an owner to the collection
  addOwner(newOwner: Owner): Observable<string> {
    // Send post request to add a new owner with the owner data as the body.
    return this.httpClient.post<{ id: string }>(this.ownerUrl + '/new', newOwner).pipe(map(res => res.id));
  }

  getPDF(name: string, x500: string): jsPDF {
    const url: string = environment.BASE_URL + '/' + x500;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    doc.setFontSize(18);
    doc.text(name + '\'s DoorBoard', (8.5 / 2), 4, { align: 'center' });
    doc.text(url, (8.5 / 2), 4.5, { align: 'center' });

    return doc;
  }


  async retrieveOwner() {
    this.getx500Sub = this.auth.userProfile$.subscribe(returned => {
      this.ownerx500 = returned.nickname;
    });
    var retrievedOwner;
    try {
      retrievedOwner = await this.getOwnerByx500(this.ownerx500).toPromise();
    } catch (err) {
      const errorTitle = 'The requested owner was not found';
      if (err.status === 404 && err.error.title === errorTitle) {
        this.createOwner();
      }
      console.log(err);
    }
    this.owner = retrievedOwner;
  }

  createOwner(): void {
    let newOwner: Owner;

    this.getx500Sub = this.auth.userProfile$.subscribe(returned => {
      newOwner = {
        x500: returned.nickname,
        email: returned.email,
        name: returned.name,
        _id: null,
        officeNumber: null,
        building: null
      };
    });

    this.addOwner(newOwner).subscribe(newID => {
      this.snackBar.open('Successfully created a new owner', null, {
        duration: 2000,
      });
      location.reload();
    }, err => {
      this.snackBar.open('Failed to create a new owner', null, {
        duration: 2000,
      });
      console.log(err);
    });
  }
}

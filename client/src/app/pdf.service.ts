import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';

@Injectable()
export class PDFService {
  constructor() {
  }

  getPDF(): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    doc.setFontSize(18);
    doc.text('Rachel Johnson\'s DoorBoard', (8.5 / 2), 0.5, { align: 'center' });
    // TODO: hook up the production IP address for deployment.
    doc.text('http://localhost:4200', (8.5 / 2), 1, { align: 'center' });
    doc.save('DoorBoard.pdf');
  }
}

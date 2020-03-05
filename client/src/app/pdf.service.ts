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

    doc.text('Rachel Johnson\'s DoorBoard:\nhttp://localhost:4200', 0.5, 0.5);
    doc.save('DoorBoard.pdf');
  }
}

import { Injectable } from '@angular/core';
import { PDFService } from '../app/pdf.service';
import * as jsPDF from 'jspdf';

@Injectable()
export class MockPDFService extends PDFService {
  // Mock a jsPDF document. We can poke at it later, to see
  // what methods have been called on it.
  public doc: jsPDF = jasmine.createSpyObj('doc', ['save']);

  constructor() {
    super();
  }

  getPDF(): jsPDF {
    return this.doc;
  }
}

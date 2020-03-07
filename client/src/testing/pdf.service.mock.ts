import { Injectable } from '@angular/core';
import { PDFService, RealJsPDF } from '../app/pdf.service';

@Injectable()
export class MockPDFService extends PDFService {
  // Mock a jsPDF document. We can poke at it later, to see
  // what methods have been called on it.
  public doc: RealJsPDF = jasmine.createSpyObj('doc', ['save']);

  constructor() {
    super();
  }

  getPDF(): RealJsPDF {
    return this.doc;
  }
}

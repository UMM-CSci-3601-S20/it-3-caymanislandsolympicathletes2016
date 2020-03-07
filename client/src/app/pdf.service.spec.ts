import { PDFService, RealJsPDF } from './pdf.service';

describe('The PDF Service:', () => {
  describe('The getPDF() method:', () => {
    let pdfService: PDFService;
    let doc: RealJsPDF;

    beforeEach(() => {
      pdfService = new PDFService();
      doc = pdfService.getPDF();
    });

    it('makes a document with exactly one page', () => {
      expect(doc.getNumberOfPages()).toEqual(1);
    });

    it('makes a document using letter-size paper', () => {
      // In inches
      // (Leave room for some unit conversion rounding errors.)
      expect(doc.internal.pageSize.width).toBeCloseTo(8.5);
      expect(doc.internal.pageSize.height).toBeCloseTo(11);
    });
  });
});

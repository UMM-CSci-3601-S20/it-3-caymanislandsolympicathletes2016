import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { PDFService } from '../pdf.service';
import { MockPDFService } from 'src/testing/pdf.service.mock';

describe('Home:', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockPDFService: MockPDFService;

  beforeEach(() => {
    mockPDFService = new MockPDFService();

    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [HomeComponent], // declare the test component
      providers: [{provide: PDFService, useValue: mockPDFService}],
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the link (<a> tag) by CSS element selector
    de = fixture.debugElement.query(By.css('#generate-pdf-button'));
    el = de.nativeElement;
  });

  describe('The savePDF() method:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      component.savePDF();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });

  describe('The GENERATE PDF button:', () => {
    it('gets a pdf document from PDFService and calls .save() on it', () => {
      el.click();
      expect(mockPDFService.doc.save).toHaveBeenCalled();
    });
  });
});

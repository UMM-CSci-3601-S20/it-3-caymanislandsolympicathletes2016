import {Component} from '@angular/core';
import {PDFService} from '../pdf.service';

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private pdfService: PDFService) {
  }

  getPDF(): void {
    this.pdfService.getPDF();
  }
}

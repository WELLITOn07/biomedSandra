import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EbookListComponent } from '../../components/ebook-list/book-list.component';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, HeaderComponent, EbookListComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  apresentationText: string = 'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais.';

  constructor(
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  scrollToNextSection(): void {
    const ebookListElement = document.getElementById('ebookList');
    if (ebookListElement) {
      ebookListElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openListEbooks() {
    this.cdr.detectChanges();
  }
}

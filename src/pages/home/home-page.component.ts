import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EbookListComponent } from '../../components/ebook-list/book-list.component';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, HeaderComponent, EbookListComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books e cursos que oferecem conhecimentos práticos e experiências reais.';

  constructor(
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
  ) {}

  toBrowse(social: string): void {
    this.redirectionService.goTo(social);
  }

  openListEbooks(): void {
    this.cdr.detectChanges();
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }
}


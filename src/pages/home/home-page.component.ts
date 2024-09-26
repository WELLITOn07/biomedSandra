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
  imports: [CommonModule, HeaderComponent, EbookListComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais.';

  constructor(
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
  ) {}

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openListEbooks() {
    this.cdr.detectChanges();
  }
}


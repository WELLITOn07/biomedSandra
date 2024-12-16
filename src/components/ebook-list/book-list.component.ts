import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { EbookDataService } from '../../services/ebookData.service';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-ebook-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookListComponent implements OnInit {
  ebooks: Ebook[] = [];
  isLoading = true;
  accentColor = '#FFD700';

  constructor(private ebookDataService: EbookDataService, private cdr: ChangeDetectorRef, @Self() @Optional() private analytics: Analytics) {}
  ngOnInit(): void {
    this.ebookDataService.getAll().subscribe({
      next: (ebooks: Ebook[]) => {
        this.ebooks = ebooks;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar os eBooks:', err);
        this.isLoading = false;
      }
    });
  }

  trackViewEbook(ebook: Ebook): void {
    if (!this.analytics) {
      console.warn('O analytics nao esta disponivel, portanto nao foi possivel trackear o clique no bot o "Ver" do ebook ' + ebook.title);
      return;
    }
    logEvent(this.analytics, 'button_click', { label: 'ebook_view ' + '_' + ebook.title });
  }
}


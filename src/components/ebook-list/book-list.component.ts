import { AnalyticsEventService } from './../../services/analytics-event.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { EbookDataService } from '../../services/ebookData.service';

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

  constructor(private ebookDataService: EbookDataService, private cdr: ChangeDetectorRef, private analyticsEventService: AnalyticsEventService) {}
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
    this.analyticsEventService.upsertEvent({
      application: 'biomedSandra',
      eventType: 'CLICK',
      eventName: `view: ${ebook.title}`,
      quantity: 1,
    }).subscribe({
      next: () => console.log(`Evento de visualização registrado para ${ebook.title}`),
      error: (err) => console.error('Erro ao registrar evento:', err),
    });
  }
}


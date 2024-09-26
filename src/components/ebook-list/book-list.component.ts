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
  accentColor = '#FFD700';

  constructor(private ebookDataService: EbookDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ebookDataService.getAll().subscribe({
      next: (data) => {
        if (data) {
          this.ebooks = data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar os eBooks:', err);
      }
    });
  }
}

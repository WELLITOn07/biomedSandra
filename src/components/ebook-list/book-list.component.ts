import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ebook } from '../../models/ebook.model';
import { EbookDataService } from '../../services/ebookData.service';

@Component({
  selector: 'app-ebook-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ebook-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookListComponent implements OnInit {
  ebooks: Ebook[] = [];

  constructor(private ebookDataService: EbookDataService, private cdr: ChangeDetectorRef,) {}

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

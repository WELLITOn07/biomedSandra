import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { EbookDataService } from '../../services/ebookData.service';
import { map } from 'rxjs';

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

  constructor(private ebookDataService: EbookDataService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.ebookDataService.getAll()
      .pipe(
        map((ebooks: Ebook[]) => ebooks.sort((a, b) => (a.type === 'video' ? -1 : 1) - (b.type === 'video' ? -1 : 1)))
      )
      .subscribe({
        next: (ebooks: Ebook[]) => {
          this.ebooks = ebooks;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          console.error('Erro ao carregar os eBooks:', err);
          this.isLoading = false;
        }
      } as any);
  }
}

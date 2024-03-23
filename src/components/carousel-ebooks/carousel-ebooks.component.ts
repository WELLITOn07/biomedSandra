import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Ebook } from '../../models/ebook.model';
import { EbookDataServiceService } from '../../services/ebookDataService.service';

@Component({
  selector: 'app-carousel-ebooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-ebooks.component.html',
  styleUrl: './carousel-ebooks.component.scss',
})
export class CarouselEbooksComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void> = new Subject<void>();
  currentEbookIndex: number = 0;

  ebookData$: Observable<Ebook[]> = this.ebookDataServiceService.getAll();
  ebookData: Ebook[] | null = null;
  constructor(
    private cdr: ChangeDetectorRef,
    private ebookDataServiceService: EbookDataServiceService
  ) {}

  ngOnInit(): void {
    this.ebookData$.pipe(takeUntil(this.destroySubject)).subscribe({
      next: (ebookData: Ebook[]) => {
        if (ebookData) {
          this.ebookData = [...ebookData];
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.error('Erro ao buscar ebooks');
      },
    });
  }

  onSlideChange(ebook: number) {
    this.currentEbookIndex = ebook;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

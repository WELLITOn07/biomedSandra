import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselEbooksComponent implements OnInit, OnDestroy {
  showModal = false;

  private showModal$ = this.carouselEbooksService.getModalStatus();
  destroySubject: Subject<void> = new Subject<void>();

  ebookData$: Observable<Ebook[]> = this.ebookDataServiceService.getAll();
  ebookData: Ebook[] | null = null;
  constructor(
    private carouselEbooksService: CarouselEbooksService,
    private cdr: ChangeDetectorRef,
    private ebookDataServiceService: EbookDataServiceService
  ) {}

  ngOnInit(): void {
    this.showModal$.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      debugger;
      this.showModal = true;
      this.cdr.detectChanges();
    });

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

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

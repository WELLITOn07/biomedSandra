import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EbookDataServiceService } from '../../services/ebookData.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Ebook } from '../../models/ebook.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebook-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ebook-details-modal.component.html',
  styleUrl: './ebook-details-modal.component.scss',
})
export class EbookDetailsModalComponent implements OnInit, OnDestroy {
  @Input() selectedEbook: Ebook | null = null;
  ebookData: Ebook[] | null = null;
  showEbookDetailsModal: boolean = true;

  destroySubject: Subject<void> = new Subject<void>();
  ebookData$: Observable<Ebook[]> = this.ebookDataServiceService.getAll();

  constructor(private ebookDataServiceService: EbookDataServiceService) {}

  ngOnInit(): void {
    this.ebookData$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((ebookData) => {
        if (ebookData) {
          this.ebookData = [...ebookData];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

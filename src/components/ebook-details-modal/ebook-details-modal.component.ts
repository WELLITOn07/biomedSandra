import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Ebook } from '../../models/ebook.model';
import { CommonModule } from '@angular/common';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';

@Component({
  selector: 'app-ebook-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ebook-details-modal.component.html',
  styleUrls: ['./ebook-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookDetailsModalComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  ebook: Ebook | null = null;
  ebookSelected$: Observable<Ebook> =
    this.ebookPurchaseRedirectService.ebookSelected$;

  private destroySubject = new Subject<void>();

  constructor(
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ebookSelected$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((ebook: Ebook) => {
        this.ebook = ebook;
        this.showModal = true;
        this.cdr.detectChanges();
      });
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

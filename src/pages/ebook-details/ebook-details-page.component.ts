import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { RedirectionService } from '../../services/redirection.service';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';
import { Subscription } from 'rxjs';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { take } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { AnalyticsEventService } from '../../services/analytics-event.service';

@Component({
  selector: 'app-ebook-details-page',
  imports: [CommonModule, AppOfferTimerComponent, TestimonysComponent, HeaderComponent],
  standalone: true,
  templateUrl: './ebook-details-page.component.html',
  styleUrls: ['./ebook-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookDetailsPageComponent implements OnInit {
  ebook: Ebook | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
    private analyticsEventService: AnalyticsEventService
  ) {}

  ngOnInit(): void {
    this.subscription = this.ebookPurchaseRedirectService.ebookSelected$
      .pipe(take(1))
      .subscribe((ebook) => {
        this.ebook = ebook;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toBrowseExternal(url: string | undefined): void {
    if (url) {
      this.redirectionService.goToExternal(url);
    }
  }

  trackBuyEbook(ebook: Ebook | null): void {
    if (ebook) {
      this.analyticsEventService.upsertEvent({
        application: 'biomedSandra',
        eventType: 'CLICK',
        eventName: `buy_${ebook.title}`,
        quantity: 1,
      }).subscribe({
        next: () => console.log(`Evento de compra registrado para ${ebook.title}`),
        error: (err) => console.error('Erro ao registrar evento:', err),
      });
    }
  }
}


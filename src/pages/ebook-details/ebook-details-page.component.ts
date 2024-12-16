import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, Optional, Self } from '@angular/core';
import { Router } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { RedirectionService } from '../../services/redirection.service';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';
import { Subscription } from 'rxjs';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { take } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { Analytics, logEvent } from '@angular/fire/analytics';

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
     @Self() @Optional() private analytics: Analytics
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
    if (!this.analytics) {
      console.warn('O analytics nao esta disponivel, portanto nao foi possivel trackear o clique no bot o "Comprar" do ebook ' + ebook?.title);
      return;
    }
    logEvent(this.analytics, 'button_click', { label: 'ebook_buy ' + '_' + ebook?.title });
  }
}


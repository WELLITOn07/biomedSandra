import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { RedirectionService } from '../../services/redirection.service';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';
import { Observable, Subscription } from 'rxjs';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { take } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { AnalyticsEventService } from '../../services/analytics-event.service';
import { SubscriptionModalComponent } from '../../components/subscription-modal/subscription-modal';
import { EmailSubscriptionService } from '../../services/email-subscription.service';
import { CtaButtonComponent } from '../../components/app-cta-button/app-cta-button';
import { SupportFooterComponent } from '../../components/support-footer/support-footer.component';
import { TestimonyData } from '../../models/testimony.model';

@Component({
  selector: 'app-ebook-details-page',
  imports: [CommonModule, AppOfferTimerComponent, TestimonysComponent, HeaderComponent, SubscriptionModalComponent,CtaButtonComponent, SupportFooterComponent],
  standalone: true,
  templateUrl: './ebook-details-page.component.html',
  styleUrls: ['./ebook-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookDetailsPageComponent implements OnInit {
  ebook: Ebook | null = null;
  private subscription: Subscription | null = null;
  userHasSubscribed$!: Observable<boolean>;
  hasSubscribed: boolean = false;
  showModal: boolean = false;
  selectedTestimonySubject: keyof TestimonyData | null = null;

  constructor(
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
    private analyticsEventService: AnalyticsEventService,
    private emailSubscriptionService: EmailSubscriptionService
  ) {}

  ngOnInit(): void {
  this.subscription = this.ebookPurchaseRedirectService.ebookSelected$
    .pipe(take(1))
    .subscribe((ebook) => {
      if (!ebook) {
        this.router.navigate(['/ebook-not-found']);
        return;
      }

      this.ebook = ebook;
      this.selectedTestimonySubject = this.getTestimonyKeyFromEbookId(ebook.id);
      this.cdr.detectChanges();
    });

    this.userHasSubscribed$ = this.emailSubscriptionService.hasUserSubscribed();
    this.subscription.add(
      this.userHasSubscribed$.subscribe((hasSubscribed) => {
        this.hasSubscribed = hasSubscribed;
        this.cdr.detectChanges();
      })
    );

    this.subscription.add(
      this.emailSubscriptionService.hasModalBeenShown().subscribe((modalShown) => {
        this.showModal = !modalShown && !this.hasSubscribed;
        this.cdr.detectChanges();
      })
    );
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toBrowseExternal(url: string | undefined): void {
    if (url) {
      this.redirectionService.goToExternal(url);
    }
  }

  private getTestimonyKeyFromEbookId(id: string): keyof TestimonyData | null {
    switch (id) {
      case 'hemograma_curso':
        return 'hemograma_curso';
      case 'biomedic':
        return 'biomedic';
      case 'bioquimica':
        return 'bioquimica';
      case 'urinalise':
        return 'urinalise';
      case 'hematologia':
        return 'hematologia';
      case 'liquidoCefalorraquidiano':
        return 'liquidoCefalorraquidiano';
      default:
        console.error(`ebook.id "${id}" does not correspond to any key in TestimonyData.`);
        return null;
    }
  }

  trackBuyEbook(ebook: Ebook | null): void {
    if (ebook) {
      this.analyticsEventService.upsertEvent({
        application: 'biomedSandra',
        eventType: 'CLICK',
        eventName: `buy: ${ebook.title}`,
        quantity: 1,
      }).subscribe({
        next: () => console.log(`Evento de compra registrado para ${ebook.title}`),
        error: (err) => console.error('Erro ao registrar evento:', err),
      });
    }
  }
}


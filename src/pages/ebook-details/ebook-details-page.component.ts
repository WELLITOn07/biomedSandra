import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ebook } from '../../models/ebook.model';
import { RedirectionService } from '../../services/redirection.service';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';
import { Subscription } from 'rxjs';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ebook-details-page',
  templateUrl: './ebook-details-page.component.html',
  styleUrls: ['./ebook-details-page.component.scss'],
  standalone: true,
  imports: [CommonModule, AppOfferTimerComponent, NavbarComponent, TestimonysComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EbookDetailsPageComponent implements OnInit {
  ebook: Ebook | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService
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

  toBrowseExternal(url: string | undefined) {
    if (url) {
      this.redirectionService.goToExternal(url);
    }
  }
}


import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ebook } from '../../models/ebook.model';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { RedirectionService } from '../../services/redirection.service';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';

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
  ebookSelected$: Observable<Ebook | null> = this.ebookPurchaseRedirectService.ebookSelected$;

  constructor(
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService
  ) {}

  ngOnInit(): void {
    this.ebookSelected$.subscribe((ebook: Ebook | null) => {
      if (ebook) {
        this.ebook = ebook;
      }
      
      this.cdr.detectChanges();
    });
  }

  toBrowseExternal(url: string | undefined) {
    if (url) {
      this.redirectionService.goToExternal(url);
    }
  }
}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CookieConsentServiceService } from '../../services/cookieConsentService.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';
import { CarouselEbooksComponent } from '../../components/carousel-ebooks/carousel-ebooks.component';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderComponent, CarouselEbooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  consentAcquired$: Observable<boolean> = this.cookieConsent.getConsentStatus();
  destroySubject: Subject<void> = new Subject<void>();
  consentAcquired: boolean = false;

  isSafari: boolean = false;
  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private cdr: ChangeDetectorRef,
    public cookieConsent: CookieConsentServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private redirectionService: RedirectionService,
    private carouselEbooksService: CarouselEbooksService
  ) {}

  ngOnInit(): void {
    this.checkIsSafari();

    this.consentAcquired$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((consentAcquired: boolean) => {
        this.consentAcquired = consentAcquired;
        this.cdr.detectChanges();
      });
  }

  private checkIsSafari(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      if (isSafari) {
        this.isSafari = true;
        this.cdr.detectChanges();
      }
    }
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openEbooksModal() {
    this.carouselEbooksService.openModal();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

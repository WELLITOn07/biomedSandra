import { CarouselEbooksComponent } from './../../components/carousel-ebooks/carousel-ebooks.component';
import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CookieConsentService } from '../../services/cookieConsent.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderComponent, CarouselEbooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  consentAcquired$: Observable<boolean> | null = null;
  destroySubject: Subject<void> = new Subject<void>();
  consentAcquired: boolean = false;
  modalCarouselEbooksIsClose$: Observable<boolean> =
    this.carouselEbooksService.getModalStatus();
  modalCarouselEbooksIsClose: boolean = true;

  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private cdr: ChangeDetectorRef,
    public cookieConsent: CookieConsentService,
    private redirectionService: RedirectionService,
    private carouselEbooksService: CarouselEbooksService
  ) {}

  ngOnInit(): void {
    this.modalCarouselEbooksIsClose$.subscribe(
      (modalCarouselEbooksIsClose: boolean) => {
        this.modalCarouselEbooksIsClose = modalCarouselEbooksIsClose;
        this.cdr.detectChanges();
      }
    );
  }

  ngAfterViewInit(): void {
    this.cookieConsent
      .getConsentStatus()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((consentAcquired: boolean) => {
        this.consentAcquired = consentAcquired;
        this.cdr.detectChanges();
      });
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openCarouselEbooks() {
    this.carouselEbooksService.openModal();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

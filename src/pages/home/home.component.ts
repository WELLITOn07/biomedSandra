import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CookieConsentService } from '../../services/cookieConsent.service';
import { Observable, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  consentAcquired$: Observable<boolean> | null = null;
  consentAcquired: boolean = false;

  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private cdr: ChangeDetectorRef,
    public cookieConsent: CookieConsentService,
    private redirectionService: RedirectionService,
  ) {}

  ngAfterViewInit(): void {
    this.cookieConsent
      .getConsentStatus()
      .pipe(take(1))
      .subscribe((consentAcquired: boolean) => {
        this.consentAcquired = consentAcquired;
        this.cdr.detectChanges();
      });
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openListEbooks() {
    this.cdr.detectChanges();
  }
}

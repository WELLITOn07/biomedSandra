import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CookieConsentServiceService } from '../../services/cookieConsentService.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentComponent implements OnInit {
  consentAcquired$: Observable<boolean> = this.cookieConsent.getConsentStatus();
  destroySubject: Subject<void> = new Subject<void>();
  consentAcquired: boolean = false;

  constructor(public cookieConsent: CookieConsentServiceService) {}
  ngOnInit(): void {
    this.consentAcquired$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((consentAcquired: boolean) => {
        this.consentAcquired = consentAcquired;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  giveConsent(): void {
    this.cookieConsent.giveConsent();
  }
}

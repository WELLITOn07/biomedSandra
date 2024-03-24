import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private consentAcquired = new BehaviorSubject<boolean>(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public getConsentStatus(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const cookieConsent = localStorage.getItem('cookieConsent');

      if (!cookieConsent) {
        this.consentAcquired.next(false);
      } else {
        this.consentAcquired.next(true);
      }
    }

    return this.consentAcquired.asObservable();
  }

  public giveConsent(): void {
    this.consentAcquired.next(true);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'true');
    }
  }
}

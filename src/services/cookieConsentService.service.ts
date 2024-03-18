import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentServiceService {
  private consentGiven = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const cookieConsent = localStorage.getItem('cookieConsent');

      if (!cookieConsent) {
        this.consentGiven = true;
      }
    }
  }

  public getConsentStatus(): boolean {
    return this.consentGiven;
  }

  public giveConsent(): void {
    if (this.consentGiven) {
      this.consentGiven = false;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('cookieConsent', 'true');
      }
    }
  }

  public hasConsent(): boolean {
    return this.consentGiven;
  }
}

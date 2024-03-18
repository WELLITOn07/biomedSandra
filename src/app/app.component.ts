import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsentServiceService } from '../services/cookieConsentService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'biomedSandra';


  constructor(public cookieConsent: CookieConsentServiceService) {
  }

  giveConsent(): void {
    this.cookieConsent.giveConsent();
  }
}

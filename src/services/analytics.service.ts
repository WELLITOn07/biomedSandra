import { Injectable, Optional, Self } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { logEvent } from 'firebase/analytics';
import { Ebook } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    @Optional() @Self() private analytics: Analytics | null
  ) {}

  trackBuyCourse(ebook: Ebook): void {
    if (this.analytics) {
      logEvent(this.analytics, 'buy_course', {
        type: ebook.type,
        title: ebook.title,
      });
    } else {
      console.warn('Analytics não está disponível para rastrear a compra.');
    }
  }

  trackViewCourse(ebook: Ebook): void {
    if (this.analytics) {
      logEvent(this.analytics, 'view_course', {
        type: ebook.type,
        title: ebook.title,
      });
    } else {
      console.warn('Analytics não está disponível para rastrear a visualização.');
    }
  }
}


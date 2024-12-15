import { Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Ebook } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analytics: Analytics) {}

  trackBuyCourse(ebook: Ebook): void {
    logEvent(this.analytics, 'buy_course', {
      category: 'purchase',
      type: ebook.type,
      title: ebook.title,
    });
  }

  trackViewCourse(ebook: Ebook): void {
    logEvent(this.analytics, 'view_course', {
      category: 'view',
      type: ebook.type,
      title: ebook.title,
    });
  }

  trackCustomEvent(action: string, category: string, label?: string, value?: number): void {
    logEvent(this.analytics, action, {
      category,
      label,
      value,
    });
  }
}
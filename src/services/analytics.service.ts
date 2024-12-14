import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Ebook } from '../models/ebook.model';


@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private gaService: GoogleAnalyticsService) {}
  trackBuyCourse(ebook: Ebook): void {
    this.gaService.event(
      'buy_course',
      'purchase',
      ebook.type + '_' + ebook.title,
    );
  }

  trackViewCourse(ebook: Ebook): void {
    this.gaService.event(
      'view_course',
      'view',
      ebook.type + '_' + ebook.title,
    );
  }

  /**
   * Rastreia eventos customizados relacionados aos ebooks ou cursos.
   * @param action Nome do evento.
   * @param category Categoria do evento.
   * @param label Rótulo adicional (opcional).
   * @param value Valor numérico associado (opcional).
   */
  trackCustomEvent(
    action: string,
    category: string,
    label?: string,
    value?: number
  ): void {
    this.gaService.event(action, category, label, value);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ebook } from '../models/ebook.model';
import { EbookDataServiceService } from './ebookData.service';

@Injectable({
  providedIn: 'root',
})
export class EbookPurchaseRedirectService {
  private ebookSelectedSubject = new Subject<Ebook>();
  ebookSelected$ = this.ebookSelectedSubject.asObservable();
  ebook: Ebook | null = null;

  constructor(private ebookDataServiceService: EbookDataServiceService) {}

  selectEbook(idEbook: string): void {
    this.ebookDataServiceService.getOne(idEbook).subscribe((ebook: Ebook) => {
      if (ebook) {
        this.ebook = ebook;
        this.ebookSelectedSubject.next(ebook);
      } else {
        throw new Error('Ebook not found');
      }
    });
  }
}

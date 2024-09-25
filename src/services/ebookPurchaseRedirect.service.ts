import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Ebook } from '../models/ebook.model';
import { EbookDataServiceService } from './ebookData.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EbookPurchaseRedirectService {
  private ebookSelectedSubject = new BehaviorSubject<Ebook | null>(null);
  ebookSelected$ = this.ebookSelectedSubject.asObservable();
  ebook: Ebook | null = null;

  constructor(private ebookDataServiceService: EbookDataServiceService) {}

  selectEbook(idEbook: string): Observable<Ebook | null> {
    return this.ebookDataServiceService.getOne(idEbook).pipe(
      map((ebook: Ebook | null) => {
        if (ebook && ebook.id === idEbook) {
          this.ebook = ebook;
          this.ebookSelectedSubject.next(ebook);
          return ebook;
        } else {
          console.error('Ebook não encontrado ou ID incorreto');
          return null;
        }
      }),
      catchError((error) => {
        console.error('Erro ao buscar o ebook no serviço:', error);
        return of(null);
      })
    );
  }
}

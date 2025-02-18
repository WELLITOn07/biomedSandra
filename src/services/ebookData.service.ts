import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, shareReplay } from 'rxjs';
import { Ebook, EbooksPayload } from '../models/ebook.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EbookDataService {
  private apiUrl = `${environment.apiUrl}/courses.json`;
  private ebooksCache$: Observable<Ebook[]> | null = null;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Ebook[]> {
    if (!this.ebooksCache$) {
      this.ebooksCache$ = this.http.get<Ebook[]>(this.apiUrl).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Erro ao carregar eBooks:', error);
          return throwError(() => new Error('Erro ao carregar eBooks'));
        })
      );
    }
    return this.ebooksCache$;
  }

  getOne(idEbook: string): Observable<Ebook> {
    return this.getAll().pipe(
      map(ebooks => {
        const ebook = ebooks.find(e => e.id === idEbook);
        if (!ebook) {
          throw new Error(`eBook with ID ${idEbook} not found`);
        }
        return ebook;
      })
    );
  }
}

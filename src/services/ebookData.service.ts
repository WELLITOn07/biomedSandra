import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, shareReplay } from 'rxjs';
import { Ebook, EbooksPayload } from '../models/ebook.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EbookDataService {
  private apiUrl = `${environment.apiUrl}/courses`;
  private ebooksCache$: Observable<Ebook[]> | null = null;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Ebook[]> {
    if (!this.ebooksCache$) {
      this.ebooksCache$ = this.http.get<EbooksPayload>(this.apiUrl).pipe(
        map(response => response.data),
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
    const url = `${this.apiUrl}/${idEbook}`;
    return this.http.get<{ statusCode: number, message: string, data: Ebook }>(url).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Erro ao carregar o eBook com ID ${idEbook}:`, error);
        return throwError(() => new Error(`Erro ao carregar o eBook com ID ${idEbook}`));
      })
    );
  }
}

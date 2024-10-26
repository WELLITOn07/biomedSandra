import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Ebook, EbooksPayload } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class EbookDataService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  // Ajustar para retornar apenas o array de ebooks
  getAll(): Observable<Ebook[]> {
    return this.http.get<EbooksPayload>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Erro ao carregar eBooks:', error);
        return throwError(() => new Error('Erro ao carregar eBooks'));
      })
    );
  }

  // Para obter um eBook específico
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

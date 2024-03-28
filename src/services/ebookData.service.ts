import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ebook } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class EbookDataServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>('assets/data/ebooks.json');
  }

  getOne(idEbook: string): Observable<Ebook> {
    return this.getAll().pipe(
      map((ebooks: Ebook[]) => ebooks.find((ebook) => ebook.id === idEbook)),
      map((ebook) => {
        if (!ebook) {
          throw new Error('Ebook not found');
        }
        return ebook;
      })
    );
  }
}

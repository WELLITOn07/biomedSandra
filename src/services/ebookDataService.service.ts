import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ebook } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class EbookDataServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>('assets/data/ebooks.json');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Testimony } from '../models/testimony.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonyService {
  private testimonyUrl = 'assets/data/testimony.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Testimony[]> {
    return this.http.get<{ testimonies: Testimony[] }>(this.testimonyUrl).pipe(
      map((response) => response.testimonies),
      catchError((error) => {
        console.error('Error fetching testimonies:', error);
        return throwError(() => new Error('Error fetching testimonies'));
      })
    );
  }
}

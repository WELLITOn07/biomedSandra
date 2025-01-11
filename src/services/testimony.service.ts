import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Testimony, TestimonyData } from '../models/testimony.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonyService {
  private testimonyUrl = 'assets/data/testimony.json';

  constructor(private http: HttpClient) {}

  getBySubject(subject: keyof TestimonyData): Observable<Testimony[]> {
    return this.http.get<{ testimonies: TestimonyData }>(this.testimonyUrl).pipe(
      map((response) => {
        const testimoniesArray = response.testimonies[subject] || [];
        const shuffled = testimoniesArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
      }),
      catchError((error) => {
        console.error('Error fetching testimonies by subject:', error);
        return throwError(() => new Error('Error fetching testimonies by subject'));
      })
    );
  }
}

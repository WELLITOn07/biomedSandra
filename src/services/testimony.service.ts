import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { Testimony } from '../models/testimony.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestimonyService {
  private baseUrl = `${environment.apiUrl}/testimonies`;

  constructor(private http: HttpClient) {}

  getBySubject(subject: string): Observable<Testimony[]> {
    return this.http
      .get<{
        statusCode: number;
        message: string;
        data: Testimony[];
      }>(`${this.baseUrl}/by-subject/${subject}`)
      .pipe(
        map((response) => {
          const testimoniesArray = response.data || [];
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailSubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;
  private welcomeEmailUrl = `${environment.apiUrl}/advertisements/welcome`;

  constructor(private http: HttpClient) {}

  hasUserSubscribed(): boolean {
    return localStorage.getItem('userHasSubscribed') === 'true';
  }

  markUserAsSubscribed(): void {
    localStorage.setItem('userHasSubscribed', 'true');
  }

  sendWelcomeEmail(email: string): Observable<void> {
    return this.http
      .post<{ statusCode: number; message: string }>(this.welcomeEmailUrl, { email })
      .pipe(
        map(() => void 0),
        catchError((error) => {
          console.error('Error sending welcome email:', error);
          return throwError(() => new Error('Failed to send the welcome email.'));
        })
      );
  }

  subscribeEmail(payload: { email: string; applicationIds: number[] }): Observable<any> {
  return this.http.post(`${this.apiUrl}`, payload).pipe(
    catchError((error) => {
      console.error('Failed to subscribe email:', error);
      return throwError(() => new Error('Failed to subscribe email'));
    })
  );
}
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailSubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;
  private welcomeEmailUrl = `${environment.apiUrl}/advertisements/welcome`;

  private userHasSubscribedSubject = new BehaviorSubject<boolean>(false);

  private modalShownOnceSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  hasUserSubscribed(): Observable<boolean> {
    const userHasSubscribed = localStorage.getItem('userHasSubscribed') === 'true';
    this.userHasSubscribedSubject.next(userHasSubscribed);
    return this.userHasSubscribedSubject.asObservable();
  }

  markUserAsSubscribed(): void {
    localStorage.setItem('userHasSubscribed', 'true');
    this.userHasSubscribedSubject.next(true);
  }

  hasModalBeenShown(): Observable<boolean> {
    return this.modalShownOnceSubject.asObservable();
  }

  markModalAsShown(): void {
    this.modalShownOnceSubject.next(true);
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


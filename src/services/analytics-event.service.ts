import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AnalyticsEvent } from '../models/analyticsEvent.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsEventService {
  private readonly apiUrl = `${environment.apiUrl}/analytics-events`;

  constructor(private http: HttpClient) {}

  upsertEvent(event: AnalyticsEvent): Observable<any> {
    return this.http.post<AnalyticsEvent>(this.apiUrl, event);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, switchMap, timeout, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmailSubscriptionService } from '../../services/email-subscription.service';
import { AnalyticsEventService } from '../../services/analytics-event.service';

@Component({
  selector: 'app-subscription-modal',
  template: `
    <div
      class="modal fade show d-flex align-items-center justify-content-center"
      id="subscriptionModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              (click)="closeModal()"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ modalMessage }}</p>
            <form (submit)="onSubscribe($event)">
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="emailInput"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="Digite seu email"
                  [ngModelOptions]="{ standalone: true }"
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                [disabled]="isLoading"
              >
                <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [
    `
      .modal.fade.show {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1050;
      }

      .modal-dialog {
        max-width: 500px;
        width: 90%;
      }
    `,
  ],
})
export class SubscriptionModalComponent implements OnDestroy {
  @Input() modalTitle = 'Inscreva-se para receber atualizações!';
  @Input() modalMessage = 'Fique por dentro das últimas atualizações e promoções.';

  email: string = '';
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private emailSubscriptionService: EmailSubscriptionService,
    private analyticsEventService: AnalyticsEventService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  closeModal(): void {
    this.emailSubscriptionService.markModalAsShown();
    this.isLoading = false;
    
    const modalElement = document.getElementById('subscriptionModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.remove();
    }
  }

  onSubscribe(event: Event): void {
    event.preventDefault();
    if (this.isLoading || !this.email) return;

    this.isLoading = true;

    const subscriptionPayload = {
      email: this.email,
      applicationIds: [1],
    };

    const closeModalTimer = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.closeModal();
      }
    }, 10000);

    this.emailSubscriptionService
      .subscribeEmail(subscriptionPayload)
      .pipe(
        timeout(10000),
        switchMap(() =>
          this.emailSubscriptionService.sendWelcomeEmail(this.email)
        ),
        switchMap(() =>
          this.analyticsEventService.upsertEvent({
            application: 'biomedSandra',
            eventType: 'CLICK',
            eventName: `subscribe email`,
            quantity: 1,
          })
        ),
        finalize(() => {
          clearTimeout(closeModalTimer);
          this.isLoading = false;
          this.emailSubscriptionService.markUserAsSubscribed();
          this.closeModal();
        }),
        catchError((error) => {
          console.error('Failed to subscribe:', error);
          clearTimeout(closeModalTimer);
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}

